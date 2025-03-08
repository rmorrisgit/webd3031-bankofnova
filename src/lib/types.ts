import { Session } from "next-auth";

// Custom session type with optional email and account_number
export interface CustomSession extends Omit<Session, "user"> {
  user: {
    id: string;
    email: string | null;
    account_number: string | null;
    bank_accounts_id: string | null;
    role: string;
  };
  expires: string;
}
