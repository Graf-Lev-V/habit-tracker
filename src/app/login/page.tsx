import { signIn } from '../../lib/auth';
import { FaGithub } from 'react-icons/fa'

async function SignIn() {
  'use server';

  await signIn('github', { redirectTo: '/dashboard' });
}

export default function Login() {
  return (
    <main className='flex h-screen justify-center items-center'>
      <div className='bg-neutral-800 p-12 rounded shadow-lg'>
        <p className='text-3xl'>Habit Traker</p>
        <p className='text-white/75'>Track your habits, build your streaks.</p>
        <form action={SignIn}>
          <button className='py-2 px-4 rounded bg-green-700 hover:bg-green-800 transition-colors cursor-pointer flex gap-2 items-center'>
            Sign in with Github
            <FaGithub className='h-6 w-6'/>
          </button>
        </form>
      </div>
    </main>
  );
}
