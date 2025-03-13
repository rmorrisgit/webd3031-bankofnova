"use client"; 
import { Grid, Box, Typography } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserBalance } from "../../api/user";
import MonthlyEarnings from "../components/overview/MonthlyEarnings";

const UserProfile = () => {
  const { data: session, status } = useSession();
  const router = useRouter(); // For redirection to login page if not authenticated
  const [chequing, setChequing] = useState<number | null>(null);
  const [savings, setSavings] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login page
    }
    
    if (session) {
      const getBalances = async () => {
        try {
          const balances = await fetchUserBalance(); // Expecting { chequing: 5142, savings: 40321 }
          setChequing(balances.chequing || 0);
          setSavings(balances.savings || 0);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred");
          }
        }
      };
      getBalances();
    }
  }, [session, status, router]); // Including router and status in dependency array

  return (
    <PageContainer title="Overview" description="this is HOME">
      {status === "loading" ? (
        <div>Loading...</div>
      ) : session ? (
        <Box>
          <Grid item xs={12} lg={8}>
            <Typography variant="h6">Chequing Balance: {chequing !== null ? `$${chequing}` : "Loading..."}</Typography>
            <Typography variant="h6">Savings Balance: {savings !== null ? `$${savings}` : "Loading..."}</Typography>
            {error && <Typography style={{ color: "red" }}>{error}</Typography>}
          </Grid>
          <Grid item xs={12} lg={8}>
          <MonthlyEarnings title="Chequings" balance={chequing ?? 0} link="/accounts/chequing" />
          <MonthlyEarnings title="Savings" balance={savings ?? 0} link="/accounts/savings" />
          </Grid>
        </Box>
      ) : (
        <div>You need to be logged in to view this page.</div>
      )}
    </PageContainer>
  );
};

export default UserProfile;
