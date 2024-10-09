import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./prisma"
import { comparePassword } from "./comparePassword"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials
        try {
          const user = await prisma.user.findUnique({
            where: { email },
          })

          if (!user) {
            return null
          }
          if (!user.isVerified) {
            return res
              .status(403)
              .json({
                message: "Account not verified. Please verify your OTP.",
              })
          }
          if (!user.isVerified) {
            return res
              .status(403)
              .json({
                message: "Account not verified. Please verify your OTP.",
              })
          }
          const isMatch = await comparePassword(password, user.password)
          if (!isMatch) {
            return null
          }

          return user
        } catch (error) {
          console.log(error)
          return null
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!account || !account.provider) {
        console.error("Account is undefined or missing provider")
        return false
      }

      if (account.provider === "google") {
        const { name, email, image } = user
        try {
          let dbUser = await prisma.user.findUnique({
            where: { email },
          })

          if (!dbUser) {
            dbUser = await prisma.user.create({
              data: {
                name,
                email,
                profilePicture: image,
                isGoogleAuth: true,
                isVerified: true,
              },
            })
          } else {
            if (!dbUser.isVerified) {
              dbUser = await prisma.user.update({
                where: { email },
                data: {
                  isVerified: true,
                },
              })
            }
            if (!dbUser.profilePicture || dbUser.profilePicture !== image) {
              dbUser = await prisma.user.update({
                where: { email },
                data: {
                  profilePicture: image,
                },
              })
            }
            if (!dbUser.profilePicture || dbUser.profilePicture !== image) {
              dbUser = await prisma.user.update({
                where: { email },
                data: {
                  profilePicture: image,
                },
              })
            }
          }
          user.id = dbUser.id
          return true
        } catch (error) {
          console.log(error)
          return false
        }
      }
      return true
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      if (account && account.provider === "google") {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
        })
        if (dbUser) {
          token.id = dbUser.id
        }
      }

      console.log(`JWT token:`, token)
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
      }
      console.log(`Session:`, session)
      return session
    },
    async redirect({ url, baseUrl }) {
      // Redirect to admin dashboard after successful login
      if (url === "/dashboard/admin") {
        return `${baseUrl}/dashboard/admin`
      }
      return baseUrl
    },
  },
  pages: {
    signIn: "/dashboard/admin",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
