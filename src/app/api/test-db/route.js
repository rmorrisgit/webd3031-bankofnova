// src/app/api/test-db/route.js
// src/app/api/test-db/route.js
import pool from '../../../lib/db';  // Relative path instead of '@'

export async function GET(req) {
  try {
    const [rows] = await pool.query('SELECT NOW() as currentTime');
    return new Response(JSON.stringify({ success: true, time: rows[0].currentTime }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
