'use client'

import { toggleHabit } from "@/app/dashboard/actions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

export default function HabitToggle({ id }: { id: string }) {

    const toggleWithId = toggleHabit.bind(null, id)
    const [state, formActionToggle, isPendingToggle] = useActionState(toggleWithId, null)

    useEffect(() => {
        if (state) toast.error(state)
    }, [state])

    return (
        <form className="my-2" action={formActionToggle}>
            <button className='bg-green-700 hover:brightness-80 disabled:hover:brightness-100 transition-colors w-min py-2 px-4 rounded cursor-pointer disabled:cursor-default' type='submit' disabled={isPendingToggle}>
                {isPendingToggle ? 'Saving...' : 'Done'}
            </button>
        </form>
    )
}