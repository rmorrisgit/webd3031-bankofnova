'use client';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import BlankCard from '../../components/shared/BlankCard';
import MonthlyEarnings from "../../components/overiew/MonthlyEarnings";
import { useEffect, useState } from "react";
import { fetchUserBalance } from "../../../api/user"; // Assuming this function fetches the user's savings balance from the backend

const SavingsPage = () => {
  const [savingsBalance, setSavingsBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the Savings balance from API or state
    const getBalance = async () => {
      try {
        const response = await fetchUserBalance(); // Assume this returns an object with savings balance
        setSavingsBalance(response.savings); // Set the savings balance to state
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
    <PageContainer title="Savings" description="This is your Savings account overview">
      
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Savings Account Overview">
            <Grid container spacing={3}>
              {/* Savings Balance Display */}
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <Typography variant="h3" fontWeight="700">Account Balance</Typography>
                    <Typography variant="h5" color="textPrimary">
                      {formatBalance(savingsBalance)}
                    </Typography>
                    {error && <Typography variant="body2" color="error">{error}</Typography>}
                    <Typography variant="body2" color="textSecondary">
                      Your current balance is the total available amount in your savings account.
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
                      Below are your most recent transactions in the savings account.
                    </Typography>
                    <ul>
                      <li>Deposit: +$500 (March 10, 2025)</li>
                      <li>Transfer from Chequing: +$200 (March 5, 2025)</li>
                      <li>Interest Credit: +$10 (March 3, 2025)</li>
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
                      High-Yield Savings Account with interest on your deposits.
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

export default SavingsPage;
