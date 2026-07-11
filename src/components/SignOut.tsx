'use client'

import { handleSignOut } from "@/app/dashboard/actions"
import { useActionState } from "react"

export default function SignOut() {

    const [, formAction, isPending] = useActionState(handleSignOut, null)

    return (
        <form className='ml-auto' action={formAction}>
            <button className='p-2 border border-white/20 bg-neutral-800 hover:brightness-80 disabled:hover:brightness-100 transition-colors rounded cursor-pointer disabled:cursor-default min-w-[110px]' disabled={isPending}>
                {isPending ? 'Signing out...' : 'Sign Out'}
            </button>
        </form>
    )
}