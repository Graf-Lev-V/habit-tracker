export function buildCalendar(daysBack: number, calendar: string[]) {

    const dates = []
    const date = new Date()

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
        if (!day) continue
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

    return { result, totalWeeks, visibleLabels }
}