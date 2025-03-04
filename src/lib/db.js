import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost', // Change this if you're using a remote database
  user: 'nextjs_user',
  password: 'strongpassword',
  database: 'bankofnova',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to get a user by email
export const getUserByEmail = async (email) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return rows[0]; // Return the first matching user
    }
    return null; // If no user found
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new Error('Error fetching user by email');
  }
};

export default pool;
