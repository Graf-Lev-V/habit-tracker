'use server'

import { auth, signOut } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

export async function handleSignOut() {
    await signOut({ redirectTo: '/login' })
}

export async function handleCreate(formData: FormData) {
    await createHabit(formData.get('name') as string)
}

export async function createHabit(name: string) {
    const session = await auth()
    if (!session) throw new Error('Unauthorized')
    await supabaseAdmin
        .from('habits')
        .insert({ name: name, user_id: session.user!.id })
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