export function calendar() {
    const dates = []
    
    for (let i = 0; i <= 365; i++) {
        dates.push(new Date(2026, 1, 1).toISOString().split('T')[0])
    }

    return
}