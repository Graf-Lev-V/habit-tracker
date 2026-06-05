import { signIn } from '../../auth';

async function SignIn() {
  'use server';

  await signIn('github', { redirectTo: '/dashboard' });
}

export default function Login() {
  return (
    <>
      <form action={SignIn}>
        <button>Sign In</button>
      </form>
    </>
  );
}
