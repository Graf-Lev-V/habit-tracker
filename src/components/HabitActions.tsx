'use client'

import { toggleHabit, deleteHabit } from "@/app/dashboard/actions"
import { useActionState } from "react"

export default function HabitActions({ id }: { id: string }) {

    const toggleWithId = toggleHabit.bind(null, id)
    const [stateToggle, formActionToggle, isPendingToggle] = useActionState(toggleWithId, null)

    const deleteWithId = deleteHabit.bind(null, id)
    const [stateDelete, formActionDelete, isPendingDelete] = useActionState(deleteWithId, null)

    return (
        <div className='flex gap-2 my-2'>
            <form action={formActionToggle}>
                <button className='bg-green-700 hover:bg-green-800 disabled:hover:bg-green-700 transition-colors w-min py-2 px-4 rounded cursor-pointer disabled:cursor-default' type='submit' disabled={isPendingToggle}>{isPendingToggle ? 'Saving...' : 'Done'}</button>
            </form>
            <form action={formActionDelete}>
                <button className='bg-red-700 hover:bg-red-800 disabled:hover:bg-red-700 transition-colors w-min py-2 px-4 rounded cursor-pointer disabled:cursor-default' type='submit' disabled={isPendingDelete}>{isPendingDelete ? 'Deleting...' : 'Delete'}</button>
            </form>
        </div>
    )
}