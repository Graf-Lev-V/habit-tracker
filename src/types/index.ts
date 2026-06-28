export type Habit = {
    habit: {
        habit: {
            id: string,
            user_id: string,
            name: string,
            created_at: string  
        }, 
        streak: number, 
        thirtyDay: number, 
        calendar: {
            date: string, 
            completed: boolean
        }[]
    }
}