export function calculateStreak(completedDates: Array<string>) {
    completedDates.sort((a, b) => b.localeCompare(a) )
    let streak = 1;
    for (let i = 1; i < completedDates.length; i++) {
        if (new Date(completedDates[i-1]).valueOf() - new Date(completedDates[i]).valueOf() > 86400000) break
        streak += 1;
    }
    return streak;
}