import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { supabaseAdmin } from "./supabase-admin";

export const { handlers, signIn, signOut, auth } = NextAuth({ 
    providers: [GitHub],
    pages: {
        signIn: '/login'
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ account, token, user }) {
            if (account) {
                const { data } = await supabaseAdmin
                    .from('users')
                    .upsert(
                        { github_id: account.providerAccountId, email: user.email, name: user.name }, 
                        { onConflict: 'github_id' }
                    )
                    .select('id')
                    .single()
                token.userId = data!.id
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.userId as string
            return session
        }
    }
})