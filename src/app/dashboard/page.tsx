import { supabaseAdmin } from '@/lib/supabase-admin';
import { auth } from '../../lib/auth';
import { deleteHabit, toggleHabit } from './actions';
import { calculateStreak } from '@/lib/streak';
import { calendar } from '@/lib/calendar';
import { calculateBestStreak } from '@/lib/bestStreak';
import ThirtyDayCompletion from '@/lib/thirtyDay';
import AddHabitForm from '@/components/AddHabitForm';
import Header from '@/components/Header';

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized')

  const { data: habits } = await supabaseAdmin
    .from('habits')
    .select('*')
    .eq('user_id', session.user!.id)

  const { data: habit_logs } = await supabaseAdmin
    .from('habit_logs')
    .select('*')
    .eq('user_id', session.user!.id)


  const habitsToday = [...new Set(habit_logs?.filter((log) => log.completed_date === new Date().toISOString().split('T')[0])
    .map((log) => log.habit_id))]

  let bestStreak: number = 0;
  const habitStreak = habits?.map((habit) => {
    const logs = habit_logs?.filter((log) => log.habit_id === habit.id)
    const completedDates = logs?.map((log) => log.completed_date)
    const maxStreak = calculateBestStreak(completedDates!)
    bestStreak = bestStreak > maxStreak ? bestStreak : maxStreak
    const completedCalendar = calendar(completedDates!)
    return { habit: habit, streak: calculateStreak(completedDates!), thirtyDay: ThirtyDayCompletion(completedDates!), calendar: completedCalendar }
  })

  return (
    <main>
      <Header session={session}/>
      <div className='flex gap-5'> 
          <p>Habits: {habits?.length}</p>
          <p>Completed habits today: {habitsToday?.length}</p>
          <p>Max streak: {bestStreak}</p>
      </div>
      {habitStreak?.map((habit) => 
          <div key={habit.habit.id}>
            <p className='text-white'>{habit.habit.name}</p>
            <p>Streak: {habit.streak}</p>
            <p>Thirty-day complection: {habit.thirtyDay}%</p>
            <form action={deleteHabit.bind(null, habit.habit.id)}>
              <button type='submit'>Delete</button>
            </form>
            <form action={toggleHabit.bind(null, habit.habit.id)}>
              <button type='submit'>Done</button>
            </form>
            <div style={{
              display: 'grid', 
              gridTemplateRows: 'repeat(7, min-content)', 
              gridTemplateColumns: 'repeat(53, min-content)', 
              gap: '4px',
              gridAutoFlow: 'column'
            }}>
              {habit.calendar.map((date) => 
                date.completed ? 
                <div key={date.date} className='w-3 h-3 bg-green-600 rounded-xs'></div> :
                <div key={date.date} className='w-3 h-3 bg-gray-700 rounded-xs'></div>
              )}
            </div>
          </div>
      )}
      <AddHabitForm />
    </main>
  )
}
