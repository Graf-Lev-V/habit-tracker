'use client'

import { toggleHabit } from "@/app/dashboard/actions"
import { useActionState } from "react"

export default function HabitToggle({ id }: { id: string }) {

    const toggleWithId = toggleHabit.bind(null, id)
    const [, formActionToggle, isPendingToggle] = useActionState(toggleWithId, null)

    return (
        <form className="my-2" action={formActionToggle}>
            <button className='bg-green-700 hover:brightness-80 disabled:hover:brightness-100 transition-colors w-min py-2 px-4 rounded cursor-pointer disabled:cursor-default' type='submit' disabled={isPendingToggle}>{isPendingToggle ? 'Saving...' : 'Done'}</button>
        </form>
    )
}