import type { Habit } from '@/types/index'
import { deleteHabit, toggleHabit } from "@/app/dashboard/actions"

export default function HabitCard({ habit }: Habit) {
    return (
        <div>
            <p className='text-white'>{habit.habit.name}</p>
            <p>Streak: {habit.streak}</p>
            <p>Thirty-day complection: {habit.thirtyDay}%</p>
            <form action={deleteHabit.bind(null, habit.habit.id)}>
                <button type='submit'>Delete</button>
            </form>
            <form action={toggleHabit.bind(null, habit.habit.id)}>
                <button type='submit'>Done</button>
            </form>
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