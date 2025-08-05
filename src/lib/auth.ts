import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.log("Missing email or password in credentials");
          return null;
        }

        console.log("Authorize function called with:", credentials);
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          console.log("User not found or password missing");
          return null;
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          console.log("Invalid password");
          return null;
        }

        console.log("User authorized:", user);
        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (!existingUser) {
          // Create a new user with Google details
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || profile?.name,
              googleId: account.providerAccountId,
            },
          });
          return true;
        } else if (!existingUser.googleId) {
          // Link Google account to existing user (e.g., from credentials signup)
          if (account && account.providerAccountId) {
            await prisma.user.update({
              where: { email: user.email },
              data: { googleId: account.providerAccountId },
            });
          }
          return true;
        } else if (account && existingUser.googleId !== account.providerAccountId) {

          return false;
        }
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        session.user = { id: "", name: null, email: null, image: null };
      }
      if (token?.id) session.user.id = token.id as string;
      return session;
    },
  },
};