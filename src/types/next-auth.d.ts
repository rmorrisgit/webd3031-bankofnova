// src/types/next-auth.d.ts
import { JWT as NextAuthJWT } from "next-auth";
import { Session as NextAuthSession } from "next-auth";

// Extend the JWT and Session types
declare module "next-auth" {
  interface JWT {
    id?: string;
    email?: string;
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
    };
  }
}
