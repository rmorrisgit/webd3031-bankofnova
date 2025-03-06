import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'nextjs_user',
  password: 'strongpassword',
  database: 'bankofnova',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Function to get a user by email
export const getUserByEmail = async (email: string): Promise<any | null> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);

    // Type assertion to cast `rows` to an array of users
    if ((rows as Array<any>).length > 0) {
      return (rows as Array<any>)[0]; // Return the first matching user
    }
    return null; // If no user found
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw new Error('Error fetching user by email');
  }
};

// Function to get a user by account number
export const getUserByAccountNumber = async (account_number: string): Promise<any | null> => {
  try {
    // Join bank_accounts with users table to get the user details
    const [rows] = await pool.execute(
      `SELECT users.* FROM users 
       JOIN bank_accounts ON users.id = bank_accounts.user_id 
       WHERE bank_accounts.account_number = ?`,
      [account_number]
    );

    // Return the first matching user or null if no user found
    return (rows as Array<any>).length > 0 ? (rows as Array<any>)[0] : null;
  } catch (error) {
    console.error('Error fetching user by account number:', error);
    throw new Error('Error fetching user by account number');
  }
};


export default pool;
