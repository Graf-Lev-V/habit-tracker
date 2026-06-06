import { auth, signOut } from '../../lib/auth';

export default async function Dashboard() {
  const session = await auth();

  async function SignOut() {
    'use server'

    await signOut({ redirectTo: '/login' });
  }

  return (
    <>
      <form action={SignOut}>
        <button>Sign Out</button>
      </form>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.id}</p>
    </>
  );
}
