// src/lib/types.ts
import { Session } from "next-auth";

// Extend the Session type to include custom fields like `id` and `role`
export interface CustomSession extends Session {
  user: {
    id: string;
    email: string;
    role: string;
  };
}
