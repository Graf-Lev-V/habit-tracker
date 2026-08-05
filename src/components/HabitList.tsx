'use client'

import { Habit } from "@/types"
import { AnimatePresence, motion } from "framer-motion"
import HabitCard from "./HabitCard"
import { useState } from "react"

export default function HabitList({ habitStreak }: { habitStreak: Habit[] }) {

    const [showEmpty, setShowEmpty] = useState(habitStreak.length === 0)
    const [showCards, setShowCards] = useState(habitStreak.length > 0)

    if (habitStreak.length > 0 && showEmpty) {
        setShowEmpty(false)
    }

    return (
            <div className="flex flex-col gap-4 justify-center items-center w-full max-w-full min-w-0 w-max">
                <AnimatePresence onExitComplete={() => {
                    if (habitStreak.length === 0) {
                        setShowEmpty(true)
                        setShowCards(false)
                    }
                }}>
                    {showCards && habitStreak?.map((habit) => (
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
                <AnimatePresence onExitComplete={() => {
                    if (habitStreak.length > 0) setShowCards(true)
                }}>
                    {showEmpty &&
                    <motion.div
                        key='empty'
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0, scale: 0.95}}
                        transition={{duration: 0.4}}
                    >
                        <p className='rounded p-4 bg-neutral-800 text-white/80'>No habits yet. Add your first one to start tracking your progress.</p>
                    </motion.div>
                    }
                </AnimatePresence>
            </div>
    )
}