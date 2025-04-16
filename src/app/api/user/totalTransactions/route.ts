// src/app/api/user/totalTransactions/route.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows]: any = await pool.query(`
      SELECT COUNT(*) AS total_transactions
      FROM transactions
      WHERE sender_id IS NOT NULL AND status = 'completed'
    `);

    const total = rows[0]?.total_transactions || 0;

    return NextResponse.json({ success: true, total });
  } catch (error) {
    console.error("Error calculating total transactions count:", error);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
