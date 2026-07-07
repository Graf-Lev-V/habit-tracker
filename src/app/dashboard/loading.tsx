export default function Loading() {
    return (
        <main className='p-4 flex flex-col items-center gap-4'>
            <div className='grid grid-cols-3 gap-5'>
                <div className='px-8 py-6 rounded flex flex-col gap-2 text-center bg-neutral-700 shadow-lg animate-pulse h-24 w-48'>

                </div>
                <div className='px-8 py-6 rounded flex flex-col gap-2 text-center bg-neutral-700 shadow-lg animate-pulse h-24 w-48'>

                </div>
                <div className='px-8 py-6 rounded flex flex-col gap-2 text-center bg-neutral-700 shadow-lg animate-pulse h-24 w-48'>

                </div>
            </div>
            <div className='rounded p-4 bg-neutral-800 flex flex-col shadow-lg animate-pulse w-full max-w-2xl h-24'>

            </div>
            <div className='rounded p-4 bg-neutral-800 flex flex-col shadow-lg animate-pulse w-full max-w-2xl h-24'>

            </div>
        </main>
    )
}