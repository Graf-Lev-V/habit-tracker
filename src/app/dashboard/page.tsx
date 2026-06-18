import { supabaseAdmin } from '@/lib/supabase-admin';
import { auth } from '../../lib/auth';
import { handleSignOut, handleCreate, deleteHabit, toggleHabit } from './actions';
import { calculateStreak } from '@/lib/streak';

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

  const habitStreak = habits?.map((habit) => {
    const logs = habit_logs!.filter((log) => log.habit_id === habit.id)
    const completedDates = logs.map((log) => log.completed_date)
    return { habit: habit, streak: calculateStreak(completedDates) }
  })
  
  return (
    <>
      <form action={handleSignOut}>
        <button>Sign Out</button>
      </form>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.id}</p>
      <form action={handleCreate}>
        <input className='border border-white' name='name' placeholder='Habit name'></input>
        <button type='submit'>Add habit</button>
      </form>
      {habits?.map((habit) => 
          <div key={habit.id}>
            <p className='text-white'>{habit.name}</p>
            <form action={deleteHabit.bind(null, habit.id)}>
              <button type='submit'>Delete</button>
            </form>
            <form action={toggleHabit.bind(null, habit.id)}>
              <button type='submit'>Done</button>
            </form>
          </div>
      )}
    </>
  )
}
