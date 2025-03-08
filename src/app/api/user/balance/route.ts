import { getServerSession } from "next-auth";
import { NextRequest } from 'next/server';
import pool from "../../../../lib/db"; // Adjust the path if necessary
import mysql from 'mysql2/promise'; // Correct import for mysql2/promise
import { authOptions } from "../../../../auth"; // Correct import for authOptions from auth.ts
export async function GET(req: NextRequest) {
  // Get session to check authentication using getServerSession
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const userId = session.user.id; // Get user ID from session

  try {
    // Query the balance from the bank_accounts table
    const [account] = await pool.query<mysql.RowDataPacket[]>(
      "SELECT balance FROM bank_accounts WHERE user_id = ?",
      [userId]
    );

    // Check if account exists and if balance is found
    if (!account || account.length === 0) {
      return new Response(JSON.stringify({ error: "Bank account not found" }), { status: 404 });
    }

    // Return the balance as JSON
    return new Response(JSON.stringify({ balance: account[0].balance }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
