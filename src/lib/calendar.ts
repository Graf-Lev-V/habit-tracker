export function calendar() {
    const dates = []
    const date = new Date()
    for (let d = 0; d <= 365; d++) {
        dates.push(date.toISOString().split('T')[0])
        date.setDate(date.getDate() - 1);
    }

    return
}