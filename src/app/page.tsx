import Link from "next/link";

export default function Home() {
  return (
      <main className="min-h-screen flex flex-col justify-center items-center gap-4">
        <h1 className="text-4xl">Habit Tracker</h1>
        <p className="text-white/75">Track your habits, build streaks, and stay consistent — one day at a time.</p>
        <Link href={'/login'} className="py-2 px-4 rounded bg-green-700 hover:bg-green-800 transition-colors cursor-pointer flex gap-2 items-center mt-4">Get started</Link>
      </main>
  );
}
