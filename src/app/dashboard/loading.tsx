export default function Loading() {
    return (
        <main className='p-4 flex flex-col items-center gap-4'>
            <div className='grid grid-cols-3 gap-5'>
                <div className='px-8 py-6 rounded flex flex-col gap-3 text-center bg-neutral-700 shadow-lg animate-pulse items-center'>
                    <div className="h-[20] w-[121] bg-neutral-600 rounded animate-pulse"></div>
                    <div className="h-[40] w-12 bg-neutral-600 rounded animate-pulse"></div>
                </div>
                <div className='px-8 py-6 rounded flex flex-col gap-3 text-center bg-neutral-700 shadow-lg animate-pulse items-center'>
                    <div className="h-[20] w-[121] bg-neutral-600 rounded animate-pulse"></div>
                    <div className="h-[40] w-12 bg-neutral-600 rounded animate-pulse"></div>
                </div>
                <div className='px-8 py-6 rounded flex flex-col gap-3 text-center bg-neutral-700 shadow-lg animate-pulse items-center'>
                    <div className="h-[20] w-[121] bg-neutral-600 rounded animate-pulse"></div>
                    <div className="h-[40] w-12 bg-neutral-600 rounded animate-pulse"></div>
                </div>
            </div>
            <div className='rounded p-4 bg-neutral-800 flex flex-col shadow-lg animate-pulse gap-2'>
                <div className="h-5 w-32 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-5 w-17 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-5 w-47 bg-neutral-700 rounded animate-pulse"></div>
                <div className="flex gap-2">
                    <div className="h-10 w-18 bg-neutral-700 rounded animate-pulse"></div>
                    <div className="h-10 w-18 bg-neutral-700 rounded animate-pulse"></div>
                </div>
                <div className="h-[108] w-[844] bg-neutral-700 rounded animate-pulse"></div>
            </div>
            <div className='rounded p-4 bg-neutral-800 flex flex-col shadow-lg animate-pulse gap-2'>
                <div className="h-5 w-32 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-5 w-17 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-5 w-47 bg-neutral-700 rounded animate-pulse"></div>
                <div className="flex gap-2">
                    <div className="h-10 w-18 bg-neutral-700 rounded animate-pulse"></div>
                    <div className="h-10 w-18 bg-neutral-700 rounded animate-pulse"></div>
                </div>
                <div className="h-[108] w-[844] bg-neutral-700 rounded animate-pulse"></div>
            </div>
        </main>
    )
}