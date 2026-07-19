'use client'

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    return (
        <main className="h-screen flex flex-col items-center justify-center">
            <div className="p-8 rounded bg-neutral-800 shadow-md flex flex-col gap-2 items-center">   
                <p className="text-2xl">Something went wrong.</p>
                <button className="bg-green-700 hover:brightness-90 rounded py-3 px-2 cursor-pointer transition-colors w-max" onClick={reset}>Try again.</button>
            </div>
        </main>
    )
}