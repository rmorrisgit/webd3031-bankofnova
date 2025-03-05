import NextAuth from "next-auth";
import { authOptions } from "../../../../auth"; // Assuming you have your `authOptions` here

// Export the NextAuth handler for GET and POST methods
export const handler = NextAuth(authOptions);

// Export the HTTP methods
export const GET = handler;
export const POST = handler;
