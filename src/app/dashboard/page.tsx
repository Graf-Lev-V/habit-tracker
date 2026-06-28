import { supabaseAdmin } from '@/lib/supabase-admin';
import { auth } from '../../lib/auth';
import { calculateStreak } from '@/lib/streak';
import { calendar } from '@/lib/calendar';
import { calculateBestStreak } from '@/lib/bestStreak';
import ThirtyDayCompletion from '@/lib/thirtyDay';
import AddHabitForm from '@/components/AddHabitForm';
import HabitCard from '@/components/HabitCard';

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
    <main className='p-4 flex flex-col items-center'>
      <div className='grid grid-cols-3 gap-5'>
        <div className='px-8 py-6 rounded flex flex-col gap-2 text-center' style={{background: '#333333'}}>
          <p className='text-white/80'>Habits</p>
          <p className='text-4xl'>{habits?.length}</p>
        </div>
        <div className='px-8 py-6 rounded flex flex-col gap-2 text-center' style={{background: '#333333'}}>
          <p className='text-white/80'>Completed today</p>
          <p className='text-4xl'>{habitsToday?.length}</p>
        </div>
        <div className='px-8 py-6 rounded flex flex-col gap-2 text-center' style={{background: '#333333'}}>
          <p className='text-white/80'>Max streak</p>
          <p className='text-4xl'>{bestStreak}</p>
        </div>
      </div>
      {habitStreak?.map((habit) => 
          <HabitCard key={habit.habit.id} habit={habit}/>
      )}
      <AddHabitForm />
    </main>
  )
}
