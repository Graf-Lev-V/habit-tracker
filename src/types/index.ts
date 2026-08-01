export type Habit = {
    habit: {
        id: string,
        user_id: string,
        name: string,
        created_at: string  
    }, 
    streak: number, 
    thirtyDay: number, 
    calendar: string[],
    completedToday: boolean
}