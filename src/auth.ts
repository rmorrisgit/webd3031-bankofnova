// src/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { CustomSession } from "./lib/types";  // Import CustomSession
import { getUserByEmail } from "./lib/db";
import bcrypt from "bcryptjs";

// Authentication options
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // Fetch user from the database
        const user = await getUserByEmail(credentials.email);

        // If user exists and password matches (hash comparison)
        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return {
            id: user.id,
            email: user.email,
            role: user.role, // Include role or any other properties you need
          };
        }

        // If authentication fails
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: Record<string, any> }) {
      if (user) {
        token.id = user.id;
        token.email = user.email || undefined;
        token.role = user.role || undefined;
      }
      return token;
    },

    async session({ session, token }: { session: CustomSession; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      session.expires = token.exp?.toString() || new Date().toISOString();
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/authentication/login", // Correct path for Next.js 13+ app directory
  },
};

export default NextAuth(authOptions); // Exporting NextAuth with provided options
