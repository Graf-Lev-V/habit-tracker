export default function Calendar({ calendar }: { calendar: string[] }) {

    const dates = []
    const date = new Date()

    const daysBack = 363
    const oldestDate = new Date()
    oldestDate.setDate(oldestDate.getDate() - daysBack)

    for (let d = 0; d <= daysBack; d++) {
        dates.push(date.toISOString().split('T')[0])
        date.setDate(date.getDate() - 1);
    }

    const result = dates.map((date) => calendar.includes(date) ? {date: date, completed: true} : {date: date, completed: false}).reverse()

    const daysBefore = new Date(result[0].date).getDay()
    for (let i = 0; i < daysBefore; i++) {
        result.unshift({ date: '', completed: false })
    }

    const totalWeeks = Math.ceil(result.length / 7)

    const monthLabel: { month: number, column: number }[] = []
    
    let lastMonth = -1

    for (let column = 0; column < totalWeeks; column++) {
        const week = result.slice(column * 7, column * 7 + 7)
        const day = week.find(d => d.date)

        if (!day?.date) continue

        const month = new Date(day.date).getMonth()

        if (month !== lastMonth) {
            monthLabel.push({ month, column })
            lastMonth = month
        }
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const minGap = 2

    const visibleLabels = monthLabel.filter((label, i) => {
        const next = monthLabel[i + 1]
        const width = next ? next.column - label.column : totalWeeks - label.column
        return width >= minGap
    })

    return (
        <div>
            <div className="grid grid-rows-1 gap-1" style={{gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`}}>
                {visibleLabels.map((ml) => 
                    <div key={ml.column} className="w-4" style={{gridColumnStart: ml.column + 1}}>{monthNames[ml.month]}</div>
                )}
            </div>
            <div className='calendar border-t border-white/10 pt-3 mt-1 grid grid-rows-7 gap-1 justify-center grid-flow-col' style={{gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`}}>
                {result.map((day, index) => (
                    <div
                        key={index}
                        className={`w-4 h-4 rounded-xs ${
                            !day.date
                                ? 'bg-gray-700'
                                : day.completed
                                    ? 'bg-green-600'
                                    : 'bg-gray-700'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}