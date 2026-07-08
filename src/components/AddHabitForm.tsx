'use client'

import { handleCreate } from "@/app/dashboard/actions"
import { useActionState, useEffect, useRef, useState } from "react"

export default function AddHabitForm() {
    
    const [formState, setFormState] = useState<boolean>(false)
    const [state, formAction] = useActionState(handleCreate, { error: null })
    const errorRef = useRef<HTMLParagraphElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
    
    useEffect(() => {
        if (state.error) errorRef.current?.scrollIntoView()
    }, [state.error])

    useEffect(() => {
        if (formState) formRef.current?.scrollIntoView()
    }, [formState])

    return (
        <div className="flex flex-col gap-4 items-center">
            <button className="w-12 h-12 border border-white/25 bg-neutral-800 hover:bg-neutral-900 cursor-pointer transition-colors rounded text-xl shadow-lg" onClick={() => setFormState(!formState)}>+</button>
            {formState &&
            <form className='flex gap-5 relative' action={formAction} onSubmit={() => setFormState(!formState)} ref={formRef}>
                <input className='border border-white/50 bg-neutral-800 p-4 rounded relative shadow-lg' name='name' placeholder='Habit name' required maxLength={50}></input>
                {state.error && <p className="text-red-500 text-sm absolute top-full" ref={errorRef}>{state.error}</p>}
                <button className="bg-green-700 hover:bg-green-800 transition-colors py-2 px-4 rounded shadow-lg cursor-pointer" type='submit'>Add habit</button>
            </form>}
        </div>
    )
}