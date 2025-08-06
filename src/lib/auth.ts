import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  // Remove adapter to avoid conflicts with manual user creation
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // JWT strategy works well without adapter
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
      
      if (account?.provider === "google" && user.email) {
        try {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
          });
          
          if (!existingUser) {
            // Create new user for Google OAuth
            console.log("Creating new user for Google OAuth");
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || "",
                googleId: account.providerAccountId,
              },
            });
            console.log("User created:", newUser.id);
          } else if (!existingUser.googleId) {
            // Link Google account to existing user
            console.log("Linking Google account to existing user");
            await prisma.user.update({
              where: { email: user.email },
              data: { googleId: account.providerAccountId },
            });
          }
          return true;
        } catch (error) {
          console.error("Error in Google OAuth signIn:", error);
          return false;
        }
      }
      
      // Allow all other sign-ins (credentials)
      return true;
    },
    async jwt({ token, user, account }) {
      // If this is the first time the user signs in
      if (account && user?.email) {
        // Find the user in our database to get the ID
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (dbUser) {
          token.id = dbUser.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};