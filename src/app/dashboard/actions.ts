'use server'

import { auth, signOut } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function handleSignOut() {
    await signOut({ redirectTo: '/login' })
}

export async function handleCreate(prevState: { error: string | null, success: number }, formData: FormData) {
    if (!formData.get('name')?.toString()) return { error: 'Habit name is required', success: prevState.success }
    if (formData.get('name')!.toString().length > 50) return { error: 'Habit name must be no more than 50 characters', success: prevState.success }
    const error = await createHabit(formData.get('name') as string)
    if (error) return { error: 'Something went wrong. Please try again.', success: prevState.success }
    return { error: null, success: prevState.success + 1 }
}

export async function createHabit(name: string) {
    
    if (!name.trim()) throw new Error('Habit name is required')
    if (name.trim().length > 50) throw new Error('Habit name must be no more than 50 characters')
    
    const session = await auth()
    
    if (!session) throw new Error('Unauthorized')
    const { error } = await supabaseAdmin
        .from('habits')
        .insert({ name: name, user_id: session.user!.id })
    revalidatePath('/dashboard')
    return error
}

export async function toggleHabit(id: string, prevState: { error: string | null, attempt: number }) {
    const session = await auth()
    if (!session) throw new Error('Unauthorized')

    const today = new Date().toISOString().split('T')[0]

    const { data: existing } = await supabaseAdmin
        .from('habit_logs')
        .select('id')
        .eq('habit_id', id)
        .eq('completed_date', today)
        .maybeSingle()

    let error;
    if (existing) {
    const { error: err } = await supabaseAdmin
        .from('habit_logs')
        .delete()
        .eq('habit_id', id)
        .eq('completed_date', today)
        .eq('user_id', session.user!.id)
    error = err
    }
    else {
    const { error: err } = await supabaseAdmin
        .from('habit_logs')
        .insert({ 
            habit_id: id, 
            user_id: session.user!.id, 
            completed_date: new Date().toISOString().split('T')[0] 
        })
        error = err
    }
    revalidatePath('/dashboard')
    return { error: error ? 'Something went wrong. Please try again.' : null, attempt: prevState.attempt + 1 }
}

export async function deleteHabit(id: string, prevState: { error: string | null, attempt: number }) {
    const session = await auth()
    if (!session) throw new Error('Unauthorized')
    const { error } = await supabaseAdmin
        .from('habits')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user!.id)
    revalidatePath('/dashboard')
    return { error: error ? 'Something went wrong. Please try again.' : null, attempt: prevState.attempt + 1 }
}