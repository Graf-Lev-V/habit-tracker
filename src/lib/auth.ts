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
        async jwt({ account, token }) {
            if (account) {
                token.userId = await supabaseAdmin
                    .from('users')
                    .eq('github_id', account.providerAccountId)
                    
            }
        }

        session({ session, token }) {
            session.user.id = token.sub!
            return session
        }
    }
})