// src/types/next-auth.d.ts

import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extending the NextAuth session type to include 'account_number'
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      account_number: string | null;
      role: string;
    };
  }

  interface JWT {
    id: string;
    email: string | null;
    account_number: string | null;
    role: string;
  }
}
