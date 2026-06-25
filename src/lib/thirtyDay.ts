export default function ThirtyDayCompletion(completedDates: Array<string>) {
    const uniqueDates = [...new Set(completedDates)]
    let thirtyDayCompleted = 0;
    for (let i = 0; i <= 30; i++) {
        if (uniqueDates[i] === (new Date().getDate() - 1).toString().split('T')[0]) thirtyDayCompleted += 1;
    }
    return thirtyDayCompleted / 30 * 100
}