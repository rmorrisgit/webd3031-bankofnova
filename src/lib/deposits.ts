import pool from "./db"; // Ensure this imports your MariaDB connection

export const processDeposit = async (userId: string, accountId: string, amount: number): Promise<boolean> => {
  try {
    // Round the deposit amount to 2 decimal places before adding it to the balance
    const roundedAmount = Math.round(amount * 100) / 100;

    // Update the balance of the chequing account by adding the deposit amount
    const [result] = await pool.query(
      'UPDATE bank_accounts SET balance = balance + ? WHERE id = ? AND user_id = ?',
      [roundedAmount, accountId, userId]
    );

    // Check if the affectedRows exists in the first element of the result
    return (result as { affectedRows: number }).affectedRows > 0;
  } catch (err) {
    console.error("Error processing deposit:", err);
    return false;
  }
};
