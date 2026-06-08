import { supabaseAdmin } from '@/lib/supabase-admin';
import { auth, signOut } from '../../lib/auth';
import { createHabit, deleteHabit } from './actions';

export default async function Dashboard() {
  const session = await auth();
  if (!session) throw new Error('Unauthorized')

  async function SignOut() {
    'use server'
    await signOut({ redirectTo: '/login' });
  }

  const { data: habits } = await supabaseAdmin
    .from('habits')
    .select('*')
    .eq('user_id', session.user!.id)

  async function handleCreate(formData: FormData) {
    'use server'
    const name = formData.get('name') as string
    await createHabit(name)
  }

  return (
    <>
      <form action={SignOut}>
        <button>Sign Out</button>
      </form>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.id}</p>
      <form action={handleCreate}>
        <input placeholder='Habit name'></input>
        <button type='submit'>Add habit</button>
      </form>
      {habits?.map((habit) => 
          <div key={habit.id}>
            <p>{habit.name}</p>
            <form action={deleteHabit.bind(null, habit.id)}>
              <button type='submit'></button>
            </form>
          </div>
      )}
    </>
  )
}
