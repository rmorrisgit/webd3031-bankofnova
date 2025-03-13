'use client';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from '../../components/shared/BlankCard';
import MonthlyEarnings from "../../components/overview/MonthlyEarnings";
import { useEffect, useState } from "react";
import { fetchUserBalance } from "../../../api/user"; // Assuming this function fetches the user's balance from the backend

const ChequingPage = () => {
  const [chequingBalance, setChequingBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the Chequing balance from API or state
    const getBalance = async () => {
      try {
        const response = await fetchUserBalance(); // Assume this returns an object with chequing balance
        setChequingBalance(response.chequing); // Set the balance to state
      } catch (error) {
        setError("Failed to fetch balance.");
      }
    };
    
    getBalance();
  }, []); // Runs once when the component mounts

  const formatBalance = (balance: number | null) => {
    if (balance === null || isNaN(Number(balance))) {
      return 'Loading...'; // Return loading message if balance is null or invalid
    }
    return `$${Number(balance).toFixed(2)}`; // Ensure balance is a number before using toFixed()
  };

  return (
    <PageContainer title="Chequing" description="This is your Chequing account overview">
      
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Chequing Account Overview">
            <Grid container spacing={3}>
              {/* Typography Examples for Chequing */}
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h1">Chequing Account Overview</Typography>
                    <Typography variant="body1" color="textSecondary">
                      Get detailed insights into your chequing account balance and transactions.
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>

              {/* Balance Display */}
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h3" fontWeight="700">Account Balance</Typography>
                    <Typography variant="h5" color="textPrimary">
                      {formatBalance(chequingBalance)}
                    </Typography>
                    {error && <Typography variant="body2" color="error">{error}</Typography>}
                    <Typography variant="body2" color="textSecondary">
                      Your current balance is the total available amount in your chequing account.
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>

              {/* Recent Transactions */}
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h4">Recent Transactions</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Below are your most recent transactions in the chequing account.
                    </Typography>
                    <ul>
                      <li>Deposit: +$500 (March 10, 2025)</li>
                      <li>Transfer to Savings: -$200 (March 5, 2025)</li>
                      <li>ATM Withdrawal: -$50 (March 3, 2025)</li>
                    </ul>
                  </CardContent>
                </BlankCard>
              </Grid>

              {/* Other Information */}
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h5">Account Type</Typography>
                    <Typography variant="body1" color="textSecondary">
                      Standard Chequing Account with no minimum balance requirement.
                    </Typography>
                  </CardContent>
                </BlankCard>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ChequingPage;