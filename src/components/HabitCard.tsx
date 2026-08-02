import type { Habit } from '@/types/index'
import HabitToggle from './HabitToggle'
import HabitDelete from './HabitDelete'
import Calendar from './Caledar'
import HabitName from './HabitName'

export default function HabitCard({ habit }: { habit: Habit }) {
    return (
        <div className='rounded p-4 bg-neutral-800 hover:brightness-110 flex flex-col shadow-lg w-full max-w-6xl'>
            <div className='flex justify-between'>
                <HabitName id={habit.habit.id} habitName={habit.habit.name}/>
                <HabitDelete id={habit.habit.id} />
            </div>
            <p className='text-white/60 text-sm'>Streak: <span className='text-green-500 font-semibold'>{habit.streak}</span></p>
            <p className='text-white/60 text-sm'>Thirty-day complection: {habit.thirtyDay}%</p>
            <HabitToggle id={habit.habit.id} completedToday={habit.completedToday} />
            <Calendar calendar={habit.calendar}/>
        </div>
    )
}