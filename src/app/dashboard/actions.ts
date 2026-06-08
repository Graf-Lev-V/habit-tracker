'use server'

import { auth } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function createHabit(name: string) {
    const session = await auth()
    if (!session) throw new Error('Unauthorized')
    await supabaseAdmin
        .from('habits')
        .insert({ name: name, user_id: session.user!.id })
}

export async function deleteHabit(id: string) {
    const session = await auth()
    if (!session) throw new Error('Unauthorized')
    await supabaseAdmin
        .from('habits')
        .delete()
        .eq('id', id)
        .eq('user_id', session.user!.id)
}

export async function toggleHabit(id: string) {
    const session = await auth()
    if (!session) throw new Error('Unauthorized')
    await supabaseAdmin
        .from('habit_logs')
        .insert({ habit_id: id, completed_date: new Date().toISOString().split('T')[0] })
}