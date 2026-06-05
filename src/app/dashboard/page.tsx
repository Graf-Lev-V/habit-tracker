import { auth } from '../../lib/auth';

export default async function Dashboard() {
  const session = await auth();

  return (
    <>
      <p>{session?.user?.name}</p>
    </>
  );
}
