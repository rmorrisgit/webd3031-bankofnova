'use client';
import { useState } from 'react';
import { Grid, TextField, Button, Typography, CardContent } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import BlankCard from '../components/shared/BlankCard';
import { processTransaction } from '../../api/transactions'; // Assume this API call processes the transaction
import RecentTransactions from "../components/overiew/RecentTransactions";

const TransactionsPage = () => {
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('deposit'); // Default to 'deposit'
  const [recipientAccount, setRecipientAccount] = useState('');
  const [transactionStatus, setTransactionStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTransactionSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!amount || parseFloat(amount) <= 0) {
    setError('Please enter a valid amount');
    return;
  }

  setError(null);
  setTransactionStatus('Processing...');

  try {
    // Process the transaction via API
    const response = await processTransaction({
      amount: parseFloat(amount),
      transactionType,
      recipientAccount: transactionType === 'transfer' ? recipientAccount : undefined,
    });

    if (response.success) {
      setTransactionStatus('Transaction successful!');
    } else {
      setTransactionStatus('Transaction failed. Please try again.');
    }
  } catch (err: unknown) {
    // Type assertion to access error message
    if (err instanceof Error) {
      setTransactionStatus('Transaction failed. Please try again.');
      setError(err.message);
    } else {
      // If the error is not an instance of Error, provide a generic message
      setTransactionStatus('Transaction failed. Please try again.');
      setError('An unknown error occurred.');
    }
  }
};

  return (
    <PageContainer title="Transactions" description="Make transactions between your accounts">
      <Grid container spacing={3}>
        <Grid item sm={12}>
       
            <Grid container spacing={3}>
              {/* Transaction Form */}
              <Grid item sm={12}>
                <BlankCard>
                  <CardContent>
                    <form onSubmit={handleTransactionSubmit}>
                      <Typography variant="h5" gutterBottom>Transaction Form</Typography>

                      {/* Amount Field */}
                      <TextField
                        label="Amount"
                        variant="outlined"
                        fullWidth
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        required
                      />

                      {/* Transaction Type (Deposit or Transfer) */}
                      <TextField
                        label="Transaction Type"
                        variant="outlined"
                        fullWidth
                        select
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}
                        required
                        SelectProps={{
                          native: true,
                        }}
                      >
                        <option value="deposit">Deposit</option>
                        <option value="transfer">Transfer</option>
                      </TextField>

                      {/* Recipient Account (only for transfer) */}
                      {transactionType === 'transfer' && (
                        <TextField
                          label="Recipient Account"
                          variant="outlined"
                          fullWidth
                          value={recipientAccount}
                          onChange={(e) => setRecipientAccount(e.target.value)}
                          required
                        />
                      )}

                      {/* Submit Button */}
                      <Button variant="contained" color="primary" type="submit" fullWidth>
                        Submit Transaction
                      </Button>
                    </form>

                    {/* Transaction Status and Error */}
                    {transactionStatus && (
                      <Typography variant="h6" color={transactionStatus === 'Transaction successful!' ? 'success' : 'error'} gutterBottom>
                        {transactionStatus}
                      </Typography>
                    )}
                    {error && (
                      <Typography variant="body2" color="error">
                        {error}
                      </Typography>
                    )}
                  </CardContent>
                </BlankCard>
              </Grid>

              {/* Transaction History (Optional) */}
              <Grid item sm={12}>
             <RecentTransactions />
              </Grid>
            </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default TransactionsPage;
