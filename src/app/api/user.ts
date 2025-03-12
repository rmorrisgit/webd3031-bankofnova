export const fetchUserBalance = async () => {
    try {
      const response = await fetch("/api/user/balance");
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch balance");
      }
      
      return data.balance;
    } catch (error) {
      throw new Error("Failed to fetch balance");
    }
  };