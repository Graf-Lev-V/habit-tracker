import { signIn } from '../../lib/auth';
import { FaGithub } from 'react-icons/fa'

async function SignIn() {
  'use server';

  await signIn('github', { redirectTo: '/dashboard' });
}

export default function Login() {
  return (
    <main className='flex h-screen justify-center items-center'>
      <div className='bg-neutral-800 px-8 py-12 sm:p-12 mx-4 rounded shadow-lg flex flex-col gap-4 max-w-sm text-center'>
        <p className='text-3xl'>Habit Traсker</p>
        <p className='text-white/75'>Track your habits, build your streaks.</p>
        <form className='flex flex-col items-center my-2' action={SignIn}>
          <button className='py-3 px-6 sm:px-8 rounded bg-green-700 hover:bg-green-800 transition-colors cursor-pointer flex gap-2 items-center justify-center whitespace-nowrap'>
            Sign in with Github
            <FaGithub className='h-6 w-6'/>
          </button>
          <p className="text-white/40 text-xs mt-2">
            Signed in with the wrong GitHub account? Sign out of GitHub first, then try again.
          </p>
        </form>
      </div>
    </main>
  );
}
