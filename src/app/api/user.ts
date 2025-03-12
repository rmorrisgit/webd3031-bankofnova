// In your API call function, ensure it returns the correct structure
export async function fetchUserBalance() {
  const response = await fetch("/api/user/balance"); // Adjust based on your API route
  if (!response.ok) {
    throw new Error("Failed to fetch balance");
  }
  const data = await response.json();
  return data.balances || { chequing: 0, savings: 0 }; // Default empty balances if not found
}
