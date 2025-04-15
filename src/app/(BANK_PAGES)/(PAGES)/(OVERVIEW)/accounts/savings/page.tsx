'use client';
import {
  Typography,
  Grid,
  CardContent,
  Box,
  Button,
} from '@mui/material';
import PageContainer from '../../../../components/container/PageContainer';
import { useEffect, useState } from "react";
import { fetchUserBalance } from "../../../../../api/user";
import { fetchUserAccounts } from "../../../../../api/accounts";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import TransactionTable from "../../../../components/TransactionTable";

const SavingsPage = () => {
  const { data: session, status } = useSession();
  const [savingsBalance, setSavingsBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [accountNumber, setAccountNumber] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      const getAccountDetails = async () => {
        try {
          const response = await fetchUserBalance();
          setSavingsBalance(response.savings ?? null); // explicitly allow null

          const accounts = await fetchUserAccounts(session.user.id);
          const savingsAccount = accounts.find((acc: any) => acc.account_type === 'savings');

          if (savingsAccount) {
            setAccountNumber(savingsAccount.account_number);
          }

        } catch (error) {
          setError("Failed to fetch account details.");
        }
      };

      getAccountDetails();
    }
  }, [session]);

  return (
    <PageContainer title="Savings" description="This is your Savings account overview">
      <Grid container direction="column" spacing={2}>
        {/* Header */}
        <Grid item xs={12}>
          <Typography mt={3} mb={2} variant="h2" fontWeight={700}>
            Savings
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Savings Account
          </Typography>
          {accountNumber && (
            <Typography variant="body2" fontSize={13} color="textSecondary" mt={2}>
              Account Number: {accountNumber}
            </Typography>
          )}
        </Grid>

        {/* Balance or Open Account Option */}
        <Grid item sm={12}>
          {savingsBalance === null ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height={120}
              border="1px dashed #ccc"
              borderRadius={2}
            >
              <Button
                variant="contained"
                onClick={() => router.push('/OpenSavings')}
              >
                Open a Savings Account
              </Button>
            </Box>
          ) : (
            <CardContent>
              <Typography variant="h1" fontWeight="700">
                ${savingsBalance}
              </Typography>
              {error && <Typography variant="body2" color="error">{error}</Typography>}
              <Typography variant="body1" color="textSecondary">Current Balance</Typography>
            </CardContent>
          )}
        </Grid>
      </Grid>

      {/* Transactions */}
{/* Transactions */}
{savingsBalance !== null ? (
  <Grid>
    <TransactionTable accountType="savings" />
  </Grid>
) : (
  <Typography mt={2} color="textSecondary">
  
  </Typography>
)}
    </PageContainer>
  );
};

export default SavingsPage;
