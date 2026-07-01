'use client'

import { handleCreate } from "@/app/dashboard/actions"
import { useState } from "react"

export default function AddHabitForm() {
    
    const [formState, setFormState] = useState<boolean>(false)

    return (
        <div className="flex flex-col gap-2 items-center">
            <button className="w-12 h-12 border border-white/25 bg-neutral-800 rounded text-xl" onClick={() => setFormState(!formState)}>+</button>
            {formState &&
            <form className='flex gap-5' action={handleCreate}>
                <input className='border border-white/50 bg-neutral-800 p-4 rounded' name='name' placeholder='Habit name'></input>
                <button type='submit'>Add habit</button>
            </form>}
        </div>
    )
}