export default function Calendar({ calendar }: { calendar: string[] }) {

    const dates = []
    const date = new Date()

    const daysBack = 365
    const oldestDate = new Date()
    oldestDate.setDate(oldestDate.getDate() - daysBack)

    const daysBefore = oldestDate.getDay()

    for (let i = 0; i <= daysBack + daysBefore; i++) {
        dates.push(date.toISOString().split('T')[0])
        date.setDate(date.getDate() - 1);
    }

    const result = dates.map((d) => ({date: d, completed: calendar.includes(d)})).reverse()

    const totalWeeks = Math.ceil(result.length / 7)

    const monthLabel: { month: number, column: number }[] = []

    let lastMonth = -1

    for (let column = 0; column < totalWeeks; column++) {
        const day = result[column * 7]
        const month = new Date(day.date).getMonth()

        if (month !== lastMonth) {
            monthLabel.push({ month, column })
            lastMonth = month
        }
    }

    const minGap = 2

    const visibleLabels = monthLabel.filter((label, i) => {
        const next = monthLabel[i + 1]
        const width = next ? next.column - label.column : totalWeeks - label.column
        return width >= minGap
    })

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return (
        <div className="border-t border-white/10 pt-3 mt-1">
            <div className="grid grid-rows-1 gap-1" style={{gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`}}>
                {visibleLabels.map((ml) => 
                    <div key={ml.column} className="w-4 text-white/70 text-sm" style={{gridColumnStart: ml.column + 1}}>{monthNames[ml.month]}</div>
                )}
            </div>
            <div className='calendar grid grid-rows-7 gap-1 justify-center grid-flow-col' style={{gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`}}>
                {result.map((day, index) => (
                    <div key={index} className={`w-4 h-4 rounded-xs ${day.completed ? 'bg-green-600' : 'bg-gray-700'}`} />
                ))}
            </div>
        </div>
    )
}