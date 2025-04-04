import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { CustomSession } from "./lib/types"; // Your custom session type
import { getUserByEmail, createUser } from "./lib/db"; // Import createUser function
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google"; // Google Provider
import GitHubProvider from "next-auth/providers/github"; // GitHub Provider
import { Account, Profile, User as NextAuthUser } from "next-auth"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Account Number", type: "text" },
        password: { label: "Password or PIN", type: "password" },
      },
      async authorize(credentials) {
        // Authentication logic for credentials
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Identifier and password are required");
        }
        let user;
        const isEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(credentials.identifier);
        if (isEmail) {
          user = await getUserByEmail(credentials.identifier);
        }

        if (user && (await bcrypt.compare(credentials.password, user.password))) {
          return {
            id: user.id.toString(),
            email: user.email || "",
            role: user.role,
            name: user.name || "Unknown",
          };
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: Record<string, any> }) {
      if (user) {
        token.id = user.id;
        token.email = user.email || "";
        token.role = user.role || "user";
        token.name = user.name || "Unknown";
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string | null;
      }
      const expiration = token.exp && !isNaN(Number(token.exp)) ? new Date(Number(token.exp) * 1000) : new Date();
      session.expires = expiration.toISOString();
      return session;
    },
    async signIn({ user, account, profile }: { user: NextAuthUser; account: Account | null; profile?: Profile }) {
      if (account && (account.provider === "google" || account.provider === "github")) {
        const email = user.email || profile?.email || "";
        const name = user.name || profile?.name || "Unknown";

        let googleId = "";
        let githubId = "";

        if (account.provider === "google") {
          googleId = account.id as string;  // Type assertion to string
        } else if (account.provider === "github") {
          githubId = account.id as string || "";  // Type assertion to string
        }

        // Check if user already exists in DB based on email
        const existingUser = await getUserByEmail(email);

        if (!existingUser) {
          const newUser = {
            email: email,
            name: name,
            role: "user", // Default role
            password: "", // No password for OAuth users
            google_id: googleId || null,  // Store Google ID if available
            github_id: githubId || null,  // Store GitHub ID if available
          };

          console.log("Creating new user:", newUser);

          // Create the new user in the database
          await createUser(newUser);
        }
      }
      return true;     
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Custom sign-in page
  },
};

export default NextAuth(authOptions);
 