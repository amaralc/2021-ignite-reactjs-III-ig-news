import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { query as q } from 'faunadb'

import { fauna } from '../../../services/fauna';

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user', // https://docs.github.com/en/developers/apps/scopes-for-oauth-apps (add more scopes, separating string with comma)
    }),
  ],
  // Follow this procedure for production: https://next-auth.js.org/warnings#jwt_auto_generated_signing_key
  // jwt:{
  //   signingKey: process.env.SIGNING_KEY
  // },
  callbacks: {
    async signIn(user, account, profile){
      const {email} = user;
      console.log(user)
      try{
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(user.email)
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              { data: { email } }
            ),
            q.Get(
              q.Match(
                q.Index('user_by_email'),
                q.Casefold(user.email)
              )
            )     
          )          
        )
        return true
      } catch {
        return false
      }
    }
  }
})