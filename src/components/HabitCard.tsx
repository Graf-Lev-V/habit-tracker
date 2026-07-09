import type { Habit } from '@/types/index'
import HabitToggle from './HabitToggle'
import HabitDelete from './HabitDelete'

export default function HabitCard({ habit }: Habit) {
    return (
        <div className='rounded p-4 bg-neutral-800 hover:brightness-110 flex flex-col shadow-lg'>
            <div className='flex justify-between'>
                <p className='text-white text-xl'>{habit.habit.name}</p>
                <HabitDelete id={habit.habit.id} />
            </div>
            <p className='text-white/75'>Streak: {habit.streak}</p>
            <p className='text-white/75'>Thirty-day complection: {habit.thirtyDay}%</p>
            <HabitToggle id={habit.habit.id} />
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