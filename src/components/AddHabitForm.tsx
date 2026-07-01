'use client'

import { handleCreate } from "@/app/dashboard/actions"
import { useState } from "react"

export default function AddHabitForm() {
    
    const [formState, setFormState] = useState<boolean>(false)

    return (
        <div className="flex flex-col gap-4 items-center">
            <button className="w-12 h-12 border border-white/25 bg-neutral-800 hover:bg-neutral-900 transition-colors rounded text-xl" onClick={() => setFormState(!formState)}>+</button>
            {formState &&
            <form className='flex gap-5' action={handleCreate}>
                <input className='border border-white/50 bg-neutral-800 p-4 rounded' name='name' placeholder='Habit name'></input>
                <button className="bg-green-700 hover:bg-green-800 transition-colors py-2 px-4 rounded" type='submit'>Add habit</button>
            </form>}
        </div>
    )
}