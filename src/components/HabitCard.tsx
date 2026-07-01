import type { Habit } from '@/types/index'
import { deleteHabit, toggleHabit } from "@/app/dashboard/actions"

export default function HabitCard({ habit }: Habit) {
    return (
        <div className='rounded p-4 bg-neutral-800 flex flex-col'>
            <p className='text-white text-xl'>{habit.habit.name}</p>
            <p className='text-white/75'>Streak: {habit.streak}</p>
            <p className='text-white/75'>Thirty-day complection: {habit.thirtyDay}%</p>
            <div className='flex gap-2 my-2'>
                <form action={toggleHabit.bind(null, habit.habit.id)}>
                    <button className='bg-green-700 hover:bg-green-800 transition-colors w-min py-2 px-4 rounded' type='submit'>Done</button>
                </form>
                <form action={deleteHabit.bind(null, habit.habit.id)}>
                    <button className='bg-red-700 hover:bg-red-800 transition-colors w-min py-2 px-4 rounded' type='submit'>Delete</button>
                </form>
            </div>
            <div style={{
                display: 'grid', 
                gridTemplateRows: 'repeat(7, min-content)', 
                gridTemplateColumns: 'repeat(53, min-content)', 
                gap: '4px',
                gridAutoFlow: 'column'
            }}>
            {habit.calendar.map((date) => 
                date.completed ? 
                <div key={date.date} className='w-3 h-3 bg-green-600 rounded-xs'></div> :
                <div key={date.date} className='w-3 h-3 bg-gray-700 rounded-xs'></div>
            )}
            </div>
        </div>
    )
}