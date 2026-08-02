'use client'

import { updateHabitName } from "@/app/dashboard/actions";
import { useState } from "react"
import { FaPen } from "react-icons/fa";
import { toast } from "sonner";

export default function HabitName({ id, habitName }: { id: string, habitName: string }) {

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [displayName, setDisplayName] = useState(habitName)

    const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const newValue = !e.target.value.trim() ? habitName : e.target.value
        setDisplayName(newValue)
        setIsEditing(false)
        const result = await updateHabitName(id, newValue)
        if (result.error) { 
            toast.error(result.error)
            setDisplayName(habitName)
        }
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') e.currentTarget.blur()
    }

    return (
        <>
        {isEditing ?
            <input className="border border-white/50 bg-neutral-900 rounded text-xl px-2 w-full" defaultValue={habitName} onBlur={handleBlur} onKeyDown={handleKeyDown} maxLength={50} autoFocus/>
            :
            <div className="flex items-center gap-2 w-max cursor-pointer" onClick={() => setIsEditing(true)}>
                <p className='text-white text-xl truncate' title={habitName}>{displayName}</p>
                <FaPen className="text-sm text-white/60"></FaPen>
            </div>
        }
        </>
    )
}