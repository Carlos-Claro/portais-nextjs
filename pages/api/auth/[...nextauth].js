import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { signIn, signOut } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils"
import session from "redux-persist/lib/storage/session"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  jwt:{},
  events:{},
  callbacks:{
    async signIn({user, account, profile, email, credentials}){
      console.log(user)
      return true
    },
    async redirect({url, baseUrl}){
      return baseUrl
    },
    async session({session, user, token}){
      return session
    },
    async jwt({token, user, account, profile, isNewUser}){
      return token
    }
  },
  debug:true,
  theme: "auto"
})