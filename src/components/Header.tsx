import Image from 'next/image'
import { handleSignOut } from '@/app/dashboard/actions'
import { Session } from 'next-auth'

export default function Header({session}: {session: Session}) {

    return (
        <div className='flex items-center py-2 px-4 border-b-1 border-white/50 gap-4'>
            <Image className='rounded-full' src={session.user?.image ?? ''} alt='user image' width={64} height={64}/>
            <p>{session.user?.name}</p>
            <form className='ml-auto' action={handleSignOut}>
            <button>Sign Out</button>
            </form>
      </div>
    )
}