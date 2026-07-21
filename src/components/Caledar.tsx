'use client'

import { useEffect, useState } from "react"

export default function Calendar({ calendar }: { calendar: string[] }) {

    const [days, setDays] = useState(() => typeof window !== 'undefined' ? window.innerWidth > 639 ? 365 : 90 : 90)

    const [result, setResult] = useState<{date: string, completed: boolean}[]>([])

    useEffect(() => {
        const dates = []
        const date = new Date()

        for (let d = 0; d <= days; d++) {
            dates.push(date.toISOString().split('T')[0])
            date.setDate(date.getDate() - 1);
        }

        const newResult = dates.map((date) => calendar.includes(date) ? {date: date, completed: true} : {date: date, completed: false}).reverse()

        if (JSON.stringify(result) !== JSON.stringify(newResult)) setResult(newResult)
    }, [calendar, days, result])

    return (
        <div className='calendar border-t border-white/10 pt-3 mt-1'>
            {result.map((date) => 
                date.completed ? 
                <div key={date.date} className='w-4 h-4 bg-green-600 rounded-xs'></div> :
                <div key={date.date} className='w-4 h-4 bg-gray-700 rounded-xs'></div>
            )}
        </div>
    )
}