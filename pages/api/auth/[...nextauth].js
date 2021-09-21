import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import ApiService from "../../../src/uteis/ApiService"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
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
      const data = {
        auth_type:account.provider,
        email:profile.email,
        nome: profile.name,
        email_verified: profile.email_verified,
        image: user.image,
        auth_id: user.id
      }
      console.log('user');
      console.log(user)
      console.log('account');
      console.log(account);
      console.log('profile');
      console.log(profile)
      console.log('email');
      console.log(email);
      console.log('credenciais');
      console.log(credentials);
      const item = new ApiService
      item.Cadastro(data).then(res => console.log(res))
      
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