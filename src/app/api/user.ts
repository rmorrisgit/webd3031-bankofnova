export async function fetchUserBalance() {
  const response = await fetch("/api/user/balance");

  if (!response.ok) {
    throw new Error("Failed to fetch balance");
  }

  const data = await response.json();

  // Ensure the response has the expected structure before returning balances
  if (data && data.balances) {
    return data.balances; // Return balances if available
  } else {
    return { chequing: 0, savings: 0 }; // Default empty balances if not found
  }
}


