'use client'

import { Habit } from "@/types"
import { AnimatePresence, motion } from "framer-motion"
import HabitCard from "./HabitCard"

export default function HabitList({ habitStreak }: { habitStreak: Habit[] }) {
    return (
        <AnimatePresence>
            {habitStreak?.map((habit) => (
                <motion.div 
                    key={habit.habit.id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0, scale: 0.95}}
                    transition={{duration: 0.4}}
                >
                    <HabitCard habit={habit} />
                </motion.div>
            ))}
        </AnimatePresence>
    )
}