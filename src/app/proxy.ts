import { auth } from '../lib/auth'
import { NextResponse, NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
    const session = await auth()
    if (!session) {
        return NextResponse.redirect(new URL('/login', req.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard']
}