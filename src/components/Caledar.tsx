export default function Calendar({ calendar }: { calendar: string[] }) {

    const dates = []
    const date = new Date()

    const daysBack = 363
    const oldestDate = new Date()
    oldestDate.setDate(oldestDate.getDate() - daysBack)

    const extraDays = oldestDate.getDay()

    const totalDays = daysBack + extraDays

    for (let d = 0; d <= totalDays; d++) {
        dates.push(date.toISOString().split('T')[0])
        date.setDate(date.getDate() - 1);
    }

    const result = dates.map((date) => calendar.includes(date) ? {date: date, completed: true} : {date: date, completed: false}).reverse()

    const totalWeeks = Math.ceil(result.length / 7)

    const monthLabel: { month: number, column: number }[] = []
    let lastMonth = -1

    result.forEach((day, index) => {
        const month = new Date(day.date).getMonth()
        const column = Math.floor(index / 7)
        if (month !== lastMonth && index % 7 === 0 && column !== 0) {
            monthLabel.push({ month, column })
            lastMonth = month
        }
    })

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return (
        <div>
            <div className="grid grid-rows-1 gap-1" style={{gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`}}>
                {monthLabel.map((ml) => 
                    <div key={ml.column} className="w-4" style={{gridColumnStart: ml.column + 1}}>{monthNames[ml.month]}</div>
                )}
            </div>
            <div className='calendar border-t border-white/10 pt-3 mt-1 grid grid-rows-7 gap-1 justify-center grid-flow-col' style={{gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`}}>
                {result.map((date) =>
                    date.completed ?
                    <div key={date.date} className='w-4 h-4 bg-green-600 rounded-xs'></div> :
                    <div key={date.date} className='w-4 h-4 bg-gray-700 rounded-xs'></div>
                )}
            </div>
        </div>
    )
}