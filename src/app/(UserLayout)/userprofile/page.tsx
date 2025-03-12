"use client"; // Mark the component as client-side component
import { Grid, Box } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
// components
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for client-side routing
import { fetchUserBalance } from '../../api/user';
import MonthlyEarnings from '../components/overiew/MonthlyEarnings';


const UserProfile = () => {
  const { data: session, status } = useSession();
  const [balance, setBalance] = useState<string | null>(null); // State for storing the balance
  const [error, setError] = useState<string | null>(null); // State for any error during the balance fetch

  useEffect(() => {
    if (session) {
      const getBalance = async () => {
        try {
          const balance = await fetchUserBalance();
          setBalance(balance);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      };
  
      getBalance();
    }
  }, [session]);

  return (
    <PageContainer title="Overview" description="this is HOME">
      {status === "loading" || !session ? (
        <div>Loading...</div>
      ) : (
        <Box>
          <Grid item xs={12} lg={8}>
            <p>Balance: {balance !== null ? `$${balance}` : "Loading balance..."}</p>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Grid>
          <Grid item xs={12} lg={8}>
            <MonthlyEarnings title="Chequings" balance={5142} />
            <MonthlyEarnings title="Savings" balance={40321} />
          </Grid>
        </Box>
      )}
    </PageContainer>
  );
}  
export default UserProfile;
