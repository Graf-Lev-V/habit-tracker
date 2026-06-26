'use client'

import { handleCreate } from "@/app/dashboard/actions"
import { useState } from "react"

export default function AddHabitForm() {
    
    const [formState, setFormState] = useState<boolean>(false)

    return (
        <div>
            <button className="w-8 h-8 border border-gray-600" onClick={() => setFormState(!formState)}>+</button>
            {formState &&
            <form className='flex gap-5' action={handleCreate}>
                <input className='border border-white' name='name' placeholder='Habit name'></input>
                <button type='submit'>Add habit</button>
            </form>}
        </div>
    )
}