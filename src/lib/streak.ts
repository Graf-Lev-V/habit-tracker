export function calculateStreak(completedDates: Array<string>) {
    if (completedDates.length === 0) return 0;
    const uniqueDates = [...new Set(completedDates)]
    uniqueDates.sort((a, b) => b.localeCompare(a) )
    let streak = 1;
    for (let i = 1; i < uniqueDates.length; i++) {
        if (new Date(uniqueDates[i-1]).valueOf() - new Date(uniqueDates[i]).valueOf() > 86400000) break
        streak += 1;
    }
    return streak;
}