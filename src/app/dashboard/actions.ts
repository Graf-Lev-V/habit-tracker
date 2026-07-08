'use server'

import { auth, signOut } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function handleSignOut() {
    await signOut({ redirectTo: '/login' })
}

export async function handleCreate(prevState: { error: string | null, success: number }, formData: FormData) {
    console.time('handle')
    if (!formData.get('name')?.toString()) return { error: 'Habit name is required', success: prevState.success }
    if (formData.get('name')!.toString().length > 50) return { error: 'Habit name must be no more than 50 characters', success: prevState.success }
    console.timeEnd('handle')
    await createHabit(formData.get('name') as string)
    return { error: null, success: prevState.success + 1 }
}


export async function createHabit(name: string) {
    console.time('create')
    if (!name.trim()) throw new Error('Habit name is required')
    if (name.trim().length > 50) throw new Error('Habit name must be no more than 50 characters')
    const session = await auth()
    if (!session) throw new Error('Unauthorized')
    await supabaseAdmin
        .from('habits')
        .insert({ name: name, user_id: session.user!.id })
    console.timeEnd('create')
    revalidatePath('/dashboard')
}

export async function deleteHabit(id: string) {
    const session = await auth()
    if (!session) throw new Error('Unauthorized')
    await supabaseAdmin
        .from('habits')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user!.id)
    revalidatePath('/dashboard')
}

export async function toggleHabit(id: string) {
    const session = await auth()
    if (!session) throw new Error('Unauthorized')
    await supabaseAdmin
        .from('habit_logs')
        .insert({ 
            habit_id: id, 
            user_id: session.user!.id, 
            completed_date: new Date().toISOString().split('T')[0] 
        })
    revalidatePath('/dashboard')
}