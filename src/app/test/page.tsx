import Header from "@/components/Header";

export default function Test() {
    return (
        <>
        <Header />
        <main className='p-4 flex flex-col items-center gap-4 pr-[25px]'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-5 pr-[1px]'>
                <div className='h-[96px] sm:h-[120px] px-8 py-3 sm:py-6 rounded flex flex-col gap-3 text-center bg-neutral-700 shadow-lg animate-pulse items-center'>
                    <div className="h-[20px] mb-[2px] w-14 bg-neutral-600 rounded animate-pulse"></div>
                    <div className="h-[34px] w-8 bg-neutral-600 rounded animate-pulse"></div>
                </div>
                <div className='h-[96px] sm:h-[120px] px-8 py-3 sm:py-6 rounded flex flex-col gap-3 text-center bg-neutral-700 shadow-lg animate-pulse items-center'>
                    <div className="h-[20px] mb-[2px] w-[121px] bg-neutral-600 rounded animate-pulse"></div>
                    <div className="h-[34px] w-8 bg-neutral-600 rounded animate-pulse"></div>
                </div>
                <div className='h-[96px] sm:h-[120px] px-8 py-3 sm:py-6 rounded flex flex-col gap-3 text-center bg-neutral-700 shadow-lg animate-pulse items-center'>
                    <div className="h-[20px] mb-[2px] w-[80px] bg-neutral-600 rounded animate-pulse"></div>
                    <div className="h-[34px] w-8 bg-neutral-600 rounded animate-pulse"></div>
                </div>
            </div>
            <div className='w-full max-w-6xl rounded p-4 bg-neutral-800 flex flex-col shadow-lg animate-pulse'>
                <div className="h-8 flex justify-between items-center gap-2 mb-1">
                    <div className="h-8 w-full bg-neutral-700 rounded animate-pulse"></div>
                    <div className="aspect-square p-4 rounded bg-neutral-700"></div>
                </div>
                <div className="h-[12px] w-[55px] mb-2 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-[12px] w-[175px] mb-1 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-[40px] w-[70px] my-2 bg-neutral-700 rounded animate-pulse"></div>
                <div className="border-t border-white/10 pt-3 mt-1">
                    <div className="h-5 mb-1"></div>
                    <div className="hidden sm:block w-full bg-neutral-700 rounded animate-pulse" style={{aspectRatio: '53 / 7'}}></div>
                    <div className="block sm:hidden w-full bg-neutral-700 rounded animate-pulse" style={{aspectRatio: '13 / 7'}}></div>
                </div>
            </div>
             <div className='w-full max-w-6xl rounded p-4 bg-neutral-800 flex flex-col shadow-lg animate-pulse'>
                <div className="h-8 flex justify-between items-center gap-2 mb-1">
                    <div className="h-8 w-full bg-neutral-700 rounded animate-pulse"></div>
                    <div className="aspect-square p-4 rounded bg-neutral-700"></div>
                </div>
                <div className="h-[12px] w-[55px] mb-2 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-[12px] w-[175px] mb-1 bg-neutral-700 rounded animate-pulse"></div>
                <div className="h-[40px] w-[70px] my-2 bg-neutral-700 rounded animate-pulse"></div>
                <div className="border-t border-white/10 pt-3 mt-1">
                    <div className="h-5 mb-1"></div>
                    <div className="hidden sm:block w-full bg-neutral-700 rounded animate-pulse" style={{aspectRatio: '53 / 7'}}></div>
                    <div className="block sm:hidden w-full bg-neutral-700 rounded animate-pulse" style={{aspectRatio: '13 / 7'}}></div>
                </div>
            </div>
        </main>
        </>
    )
}