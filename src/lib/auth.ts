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
    strategy: "database", // Use database strategy with PrismaAdapter
  },
  pages: {
    error: '/auth', // Redirect to your custom auth page on error
    signIn: '/auth', // Custom sign-in page
  },
  debug: true, // Enable debug mode for better error logging
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
      console.log("SignIn callback triggered:", { 
        provider: account?.provider, 
        email: user.email,
        userId: user.id 
      });
      
      // Allow all sign-ins - let PrismaAdapter handle user creation
      return true;
    },
    async jwt({ token, user }) {
      // Only needed for JWT strategy
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, user }) {
      // With database strategy, user comes from database
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};