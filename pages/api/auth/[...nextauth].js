import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"

const options = {
    providers: [
      GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            // scope: "repo",
            authorization: { params: { scope: "repo" } },
        }),
    ],
    secret : '9zqC4cvGdOUoS6FVl1eBFCqaI32m5UwWfVfmha9nzj0=',
    callbacks: {
      async jwt({ token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token
        }
        return token
      },
      async session({ session, token, user }) {
        // Send properties to the client, like an access_token from a provider.
        session.accessToken = token.accessToken
        return session
      }
    }
}

export default (req, res) => NextAuth(req, res, options)