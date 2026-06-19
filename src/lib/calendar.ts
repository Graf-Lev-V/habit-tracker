export function calendar(completedDates: Array<string>) {
    const dates = []
    const date = new Date()
    for (let d = 0; d <= 365; d++) {
        dates.push(date.toISOString().split('T')[0])
        date.setDate(date.getDate() - 1);
    }
    const result = dates.map((date) => completedDates.includes(date) ? {date: date, completed: true} : {date: date, completed: false}).reverse()
    return result
}