'use client';
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUserAccounts } from "../../../../../api/accounts";
import { fetchUserBalance } from "../../../../../api/user"; // Fetches balance
import { useTransferContext } from "../../../../../context/TransferContext"; // Import the context

interface Account {
  id: string;
  name: string;
  account_type: string;
  balance: number;
}

export default function ConfirmTransactionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Access transfer data from context
  const { transferData } = useTransferContext();
  const recipientAccountId = transferData.receiverAccount;
  const recipientEmail = transferData.toContact || "Loading...";
  const senderAccountId = transferData.fromAccount;

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm();

    useEffect(() => {
      if (!session?.user?.id) {
        router.push("/login");
        return;
      }
    
      const loadAccounts = async () => {
        setIsLoading(true);
        try {
          const userAccounts = await fetchUserAccounts(session.user.id);
          const balances = await fetchUserBalance();
    
          // Map balances by account_type, matching with the user accounts
          const accountsWithBalance: Account[] = userAccounts.map((account: Account) => ({
            ...account,
            balance: balances[account.account_type] ? parseFloat(balances[account.account_type].replace(/,/g, '')) : 0,  // Use account_type for matching
          }));
    
          console.log("Accounts with Balance:", accountsWithBalance); // Log the updated account data
    
          setAccounts(accountsWithBalance);
    
          if (userAccounts.length > 0 && senderAccountId) {
            const validAccount = userAccounts.find((account: Account) => account.id === senderAccountId);
            if (validAccount) {
              setValue("fromAccount", senderAccountId); // Set value only if account exists
            }
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : "Failed to load data.");
        } finally {
          setIsLoading(false);
        }
      };
    
      loadAccounts();
    }, [session, router, setValue, senderAccountId]);
    

  const onSubmit = async (data: any) => {
    try {
      if (!session?.user?.id) {
        throw new Error("User is not logged in.");
      }

      setIsLoading(true);
      setError(null);
      console.log("Recipient Email:", recipientEmail);
      console.log(transferData);  // Add this line to inspect the structure of transferData

      // Ensure recipientAccountId is correctly passed and valid
      if (!recipientAccountId) {
        throw new Error("Receiver bank account ID is missing or invalid.");
      }

      // Transfer Data to send to the backend
      const transferRequestData = {
        sender_account_id: Number(data.fromAccount), // sender's account ID
        receiver_account_id: recipientAccountId, // recipient's account ID
        amount: Number(data.amount), // transaction amount
        sender_user_id: Number(session.user.id), // user ID
      };

      // Make the API call to process the transfer
      const response = await fetch("/api/user/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transferRequestData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Transaction failed.");
      }

      router.push("/success"); // Redirect to success page

    } catch (error) {
      setError(error instanceof Error ? error.message : "Transaction failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 3, borderRadius: 2, boxShadow: 3, bgcolor: "white" }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Transaction Confirmation
      </Typography>

      <Typography variant="body2" color="textSecondary" mb={2}>
        Please review the details of your transfer.
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mb: 2 }}>
          {/* From Account Dropdown */}
         {/* From Account Dropdown */}
         <Controller
  name="fromAccount"
  control={control}
  defaultValue={accounts.some(acc => acc.id === senderAccountId) ? senderAccountId : ""}
  rules={{ required: "Please select an account" }}
  render={({ field }) => (
    <TextField
      {...field}
      fullWidth
      select
      label="From Account"
      error={!!errors.fromAccount}
      helperText={errors.fromAccount?.message as string}
      margin="normal"
    >
      {accounts.length > 0 ? (
        accounts.map((acc) => (
          <MenuItem key={acc.id} value={acc.id}>
            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
              <Typography>{acc.account_type}</Typography>
              <Typography variant="body2" color="textSecondary">
                {acc.balance !== undefined && acc.balance !== null
                  ? acc.balance.toFixed(2) 
                  : "0.00"}
              </Typography>
            </Box>
          </MenuItem>
        ))
      ) : (
        <MenuItem disabled>No accounts available</MenuItem>
      )}
    </TextField>
  )}
/>


          {/* Recipient Email (Display Only) */}
          <TextField
            fullWidth
            label="Recipient Email"
            value={recipientEmail}
            InputProps={{ readOnly: true }}
            margin="normal"
          />

          {/* Amount Field */}
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Amount is required",
              min: { value: 0.01, message: "Amount must be greater than zero" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                label="Amount"
                value={field.value || ""}
                error={!!errors.amount}
                helperText={errors.amount?.message as string}
                margin="normal"
                InputProps={{
                  inputProps: { min: 0.01, step: 0.01 },
                }}
              />
            )}
          />
        </Box>

        <Box display="flex" gap={2}>
          <Button variant="outlined" color="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Confirm Transfer"}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
