// src/auth.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { CustomSession } from "./lib/types"; // Custom session type
import { getUserByEmail, getUserByAccountNumber } from "./lib/db"; // Functions for fetching user data
import bcrypt from "bcryptjs";

// Authentication options
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Account Number", type: "text" },
        password: { label: "Password or PIN", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Identifier and password are required");
        }

        let user;
        const isEmail = credentials.identifier.includes("@");

        if (isEmail) {
          user = await getUserByEmail(credentials.identifier);
        } else {
          user = await getUserByAccountNumber(credentials.identifier);
        }

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return {
            id: user.id,
            email: user.email || null,
            account_number: user.account_number || null,
            role: user.role,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: Record<string, any> }) {
      if (user) {
        token.id = user.id;
        token.email = user.email || undefined;
        token.account_number = user.account_number || undefined;
        token.role = user.role || undefined;
      }
      return token;
    },

    async session({ session, token }: { session: CustomSession; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.account_number = token.account_number as string;
        session.user.role = token.role as string;
      }
      session.expires = token.exp?.toString() || new Date().toISOString();
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/authentication/login", // Custom sign-in page
  },
};

export default NextAuth(authOptions);
