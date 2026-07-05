import { signIn } from '../../lib/auth';

async function SignIn() {
  'use server';

  await signIn('github', { redirectTo: '/dashboard' });
}

export default function Login() {
  return (
    <main className='flex h-screen justify-center items-center'>
      <div className='bg-neutral-800 p-4 rounded shadow-lg'>
        <form action={SignIn}>
          <button>Sign In</button>
        </form>
      </div>
    </main>
  );
}
