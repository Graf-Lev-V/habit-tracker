import Image from 'next/image'
import { handleSignOut } from '@/app/dashboard/actions'
import { auth } from '@/lib/auth'

export default async function Header() {
    const session = await auth();
    return (
        <header className='flex items-center py-2 px-4 border-b-1 border-white/50 gap-4'>
            {session && 
            <>
                <Image className='rounded-full' priority src={session?.user?.image ?? ''} alt='user image' width={64} height={64}/>
                <p>{session?.user?.name}</p>
                <form className='ml-auto' action={handleSignOut}>
                    <button>Sign Out</button>
                </form>
            </>}
            {!session && 
            <>
                
            </>}
        </header>
    )
}