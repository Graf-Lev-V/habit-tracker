export function calculateBestStreak(completedDates: Array<string>) {
    if (completedDates.length === 0) return 0;
    const uniqueDates = [...new Set(completedDates)]
    uniqueDates.sort((a, b) => b.localeCompare(a) )
    let maxStreak = 1;
    for (let day = 1; day < uniqueDates.length; day++) {
        const { streak, nextDay } = calculateStreak({day, uniqueDates})
        day = nextDay;
        maxStreak = maxStreak > streak ? maxStreak : streak;
    }
    return maxStreak
}

function calculateStreak({ day, uniqueDates }: {day: number; uniqueDates: Array<string>}) {
    let streak = 1;
    let nextDay = day;
    while (day < uniqueDates.length) {
        if (new Date(uniqueDates[day-1]).valueOf() - new Date(uniqueDates[day]).valueOf() > 86400000) break
        streak += 1;
        nextDay += 1;
        day += 1;
    }
    return { streak, nextDay }
}