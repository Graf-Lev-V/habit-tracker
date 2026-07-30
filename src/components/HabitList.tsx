'use client'

import { Habit } from "@/types"
import { AnimatePresence, motion } from "framer-motion"
import HabitCard from "./HabitCard"

export default function HabitList({ habitStreak }: { habitStreak: Habit[] }) {
    return (
        <AnimatePresence mode="wait">
            {habitStreak.length === 0 ? 
            <motion.div
                key='empty'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0, scale: 0.95}}
                transition={{duration: 1}}
            >
                <p className='rounded p-4 bg-neutral-800 text-white/80'>No habits yet. Add your first one to start tracking your progress.</p>
            </motion.div>
            :
            <motion.div
                key='list'
                className="flex flex-col gap-4"
            >
                <AnimatePresence>
                {habitStreak?.map((habit) => (
                    <motion.div 
                        key={habit.habit.id}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0, scale: 0.95}}
                        transition={{duration: 1}}
                    >
                        <HabitCard habit={habit} />
                    </motion.div>
                ))}
                </AnimatePresence>
            </motion.div>
            }
        </AnimatePresence>
    )
}