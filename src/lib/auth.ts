import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({ 
    providers: [GitHub],
    pages: {
        signIn: '/login'
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        session({ session, token }) {
            session.user.id = token.sub!
            return session
        }
    }
})