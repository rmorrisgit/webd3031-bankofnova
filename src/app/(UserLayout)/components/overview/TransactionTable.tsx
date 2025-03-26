// ProductPerformance2.tsx
import { useEffect, useState } from 'react';
import { fetchTransactions } from '../../../api/user'; // Assuming you have an API function for fetching transactions
import { Chip, Stack } from '@mui/material';
interface ProductPerformanceProps {
    accountType: 'chequing' | 'savings'; // Accept accountType prop
  }
  
  const ProductPerformance2 = ({ accountType }: ProductPerformanceProps) => {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const getTransactions = async () => {
        try {
          const response = await fetchTransactions(accountType); // Fetch transactions based on accountType
          setTransactions(response); // Set transactions in state
        } catch (error) {
          setError('Failed to fetch transactions.');
        }
      };
  
      getTransactions(); // Call the function to fetch transactions
    }, [accountType]); // Refetch when accountType changes
  
    return (
      <div>
        <h2>{accountType.charAt(0).toUpperCase() + accountType.slice(1)} Transactions</h2>
        {error && <p>{error}</p>}
        <Stack direction="column" spacing={2}>
          {transactions.length === 0 ? (
            <p>No transactions available.</p>
          ) : (
            transactions.map((transaction) => (
              <div key={transaction.id}>
                <Chip label={`$${transaction.amount}`} />
                <p>{transaction.transaction_type}</p>
                <p>{transaction.status}</p>
                <p>{new Date(transaction.created_at).toLocaleString()}</p>
              </div>
            ))
          )}
        </Stack>
      </div>
    );
  };
  
  export default ProductPerformance2;