export default function Calendar({ calendar }: { calendar: string[] }) {

    const dates = []
    const date = new Date()

    for (let d = 0; d <= 363; d++) {
        dates.push(date.toISOString().split('T')[0])
        date.setDate(date.getDate() - 1);
    }

    const result = dates.map((date) => calendar.includes(date) ? {date: date, completed: true} : {date: date, completed: false}).reverse()

    const monthLabel = []
    let lastMonth = -1

    result.forEach((day, index) => {
        const month = new Date(day.date).getMonth()
        if (month !== lastMonth && index % 7 === 0) {
            monthLabel.push({ month, column: Math.floor(index / 7) })
            lastMonth = month
        }
    })

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return (
        <div className='calendar border-t border-white/10 pt-3 mt-1 grid grid-rows-7 gap-1 justify-center grid-flow-col'>
            {result.map((date) =>
                date.completed ?
                <div key={date.date} className='w-4 h-4 bg-green-600 rounded-xs'></div> :
                <div key={date.date} className='w-4 h-4 bg-gray-700 rounded-xs'></div>
            )}
        </div>
    )
}