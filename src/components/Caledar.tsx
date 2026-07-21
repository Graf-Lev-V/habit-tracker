'use client'


export default function Calendar({ calendar }: { calendar: string[] }) {

    const dates = []
    const date = new Date()

    for (let d = 0; d <= 365; d++) {
        dates.push(date.toISOString().split('T')[0])
        date.setDate(date.getDate() - 1);
    }

    const result = dates.map((date) => calendar.includes(date) ? {date: date, completed: true} : {date: date, completed: false}).reverse()

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