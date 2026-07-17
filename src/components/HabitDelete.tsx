'use client'

import { deleteHabit } from "@/app/dashboard/actions"
import { startTransition, useActionState, useEffect, useState } from "react"
import { FaTrash, FaSpinner } from "react-icons/fa"
import { toast } from "sonner"

export default function HabitDelete({ id }: { id: string }) {

    const deleteWithId = deleteHabit.bind(null, id)
    const [state, formActionDelete, isPendingDelete] = useActionState(deleteWithId, null)

    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

    useEffect(() => {
        if (state) toast.message(state)
    }, [state])

    return (
        <button 
        className={confirmDelete ? 
            'bg-red-700 hover:brightness-80 disabled:hover:brightness-100 transition-colors w-min p-2 rounded cursor-pointer disabled:cursor-default' :
            'bg-neutral-700 hover:brightness-80 transition-colors w-min p-2 rounded cursor-pointer'
        }
        type={'button'}
        disabled={isPendingDelete}
        onClick={confirmDelete ? () => startTransition(() => formActionDelete()) : () => setConfirmDelete(true)}
        onBlur={() => setConfirmDelete(false)}
        >
            {isPendingDelete ? <FaSpinner className="animate-spin"/> : <FaTrash />}
        </button>
    )
}