import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
    console.log('PROXY DEFINITELY RAN')
    return NextResponse.redirect(new URL('/login', req.url))
}

export const config = {
    matcher: ['/dashboard']
}