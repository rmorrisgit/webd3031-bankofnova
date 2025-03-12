import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

// Extend the NextAuth types 
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string | null;
      role: string;
      name: string | null; // Ensure name is never undefined
    };
  }

  interface JWT {
    id: string;
    email: string | null;
    role: string;
    name: string | null; // Ensure name is never undefined
  }
}
