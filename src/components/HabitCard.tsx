import type { Habit } from '@/types/index'
import HabitToggle from './HabitToggle'
import HabitDelete from './HabitDelete'
import Calendar from './Caledar'

export default function HabitCard({ habit }: Habit) {
    return (
        <div className='rounded p-4 bg-neutral-800 hover:brightness-110 flex flex-col shadow-lg w-full sm:w-max'>
            <div className='flex justify-between'>
                <p className='text-white text-xl'>{habit.habit.name}</p>
                <HabitDelete id={habit.habit.id} />
            </div>
            <p className='text-white/60 text-sm'>Streak: {habit.streak}</p>
            <p className='text-white/60 text-sm'>Thirty-day complection: {habit.thirtyDay}%</p>
            <HabitToggle id={habit.habit.id} />
            <Calendar calendar={habit.calendar}/>
        </div>
    )
}