'use client'

import { deleteHabit } from "@/app/dashboard/actions"
import { useActionState } from "react"

export default function HabitActions({ id }: { id: string }) {

    const deleteWithId = deleteHabit.bind(null, id)
    const [stateDelete, formActionDelete, isPendingDelete] = useActionState(deleteWithId, null)

    return (
        <form action={formActionDelete}>
            <button className='bg-red-700 hover:bg-red-800 disabled:hover:bg-red-700 transition-colors w-min py-2 px-4 rounded cursor-pointer disabled:cursor-default' type='submit' disabled={isPendingDelete}>{isPendingDelete ? 'Deleting...' : 'Delete'}</button>
        </form>
    )
}