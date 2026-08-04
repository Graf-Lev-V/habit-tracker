import Image from 'next/image'
import { auth } from '@/lib/auth'
import SignOut from './SignOut'

export default async function Header() {
    const session = await auth()
    return (
        <header>
            <div className='flex items-center py-2 px-4 border-b-1 border-white/50 gap-4'>
                <Image className='rounded-full' priority src={session?.user?.image ?? ''} alt='user image' width={64} height={64}/>
                <p>{session?.user?.name}</p>
                <SignOut className='ml-auto'/>
            </div>
        </header>
    )
}