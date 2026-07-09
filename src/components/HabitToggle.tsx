'use client'

import { toggleHabit } from "@/app/dashboard/actions"
import { useActionState } from "react"

export default function HabitActions({ id }: { id: string }) {

    const toggleWithId = toggleHabit.bind(null, id)
    const [stateToggle, formActionToggle, isPendingToggle] = useActionState(toggleWithId, null)

    return (
        <form className="my-2" action={formActionToggle}>
            <button className='bg-green-700 hover:bg-green-800 disabled:hover:bg-green-700 transition-colors w-min py-2 px-4 rounded cursor-pointer disabled:cursor-default' type='submit' disabled={isPendingToggle}>{isPendingToggle ? 'Saving...' : 'Done'}</button>
        </form>
    )
}