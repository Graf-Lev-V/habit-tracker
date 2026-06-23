import { supabaseAdmin } from '@/lib/supabase-admin';
import { auth } from '../../lib/auth';
import { handleSignOut, handleCreate, deleteHabit, toggleHabit } from './actions';
import { calculateStreak } from '@/lib/streak';
import { calendar } from '@/lib/calendar';
import Image from 'next/image'
import { calculateBestStreak } from '@/lib/bestStreak';

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
    return { habit: habit, streak: calculateStreak(completedDates!), calendar: completedCalendar }
  })

  return (
    <main>
      <div className='flex'>
        <Image src={session.user?.image ?? ''} alt='user image' width={32} height={32}/>
        <p>{session.user?.name}</p>
        <form className='ml-auto' action={handleSignOut}>
          <button>Sign Out</button>
        </form>
      </div>
      <div className='flex'> 
        <div>
          <p>Habits: {habits?.length}</p>
          <p>Completed habits today: {habitsToday?.length}</p>
          <p>Max streak: {bestStreak}</p>
        </div>
      </div>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.id}</p>
      <form action={handleCreate}>
        <input className='border border-white' name='name' placeholder='Habit name'></input>
        <button type='submit'>Add habit</button>
      </form>
      {habitStreak?.map((habit) => 
          <div key={habit.habit.id}>
            <p className='text-white'>{habit.habit.name}</p>
            <p>Streak: {habit.streak}</p>
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
    </main>
  )
}
