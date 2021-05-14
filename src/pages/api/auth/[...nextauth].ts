import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user', // https://docs.github.com/en/developers/apps/scopes-for-oauth-apps (add more scopes, separating string with comma)
    }),
  ],
})