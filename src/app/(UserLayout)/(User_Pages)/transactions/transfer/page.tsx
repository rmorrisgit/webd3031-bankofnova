"use client";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Typography, Box, MenuItem } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { fetchUserBalance } from "../../../../api/user";
import { useTransferContext } from "../../../../context/TransferContext";

export default function TransferPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { handleSubmit, control } = useForm({
    defaultValues: { toContact: "", fromAccount: "" },
  });

  const { setTransferData } = useTransferContext();
  const [isRecipientLoading, setIsRecipientLoading] = useState(false);
  const [chequingBalance, setChequingBalance] = useState<number | null>(null);
  const [savingsBalance, setSavingsBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recipient, setRecipient] = useState<any | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }

    if (session) {
      const getBalances = async () => {
        setIsLoading(true);
        try {
          const balances = await fetchUserBalance();
          setChequingBalance(balances.chequing ? parseFloat(balances.chequing.replace(/,/g, '')) : 0);
          setSavingsBalance(balances.savings ? parseFloat(balances.savings.replace(/,/g, '')) : 0);
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError("An unknown error occurred");
          }
        } finally {
          setIsLoading(false);
        }
      };

      getBalances();
    }
  }, [session, status, router]);

  const accounts = [
    { id: "1", name: "Chequing Account", balance: chequingBalance ?? 0 },
    { id: "2", name: "Savings Account", balance: savingsBalance ?? 0 },
  ];

  const fetchRecipient = async (email: string) => {
    if (email.length < 3) {
      // Don't fetch if the email is too short (e.g. only one or two characters)
      return;
    }

    setIsRecipientLoading(true);
    try {
      const response = await fetch(`/api/user/contacts?email=${email}`);
      if (!response.ok) {
        throw new Error("Recipient not found.");
      }
      const contactData = await response.json();
      setRecipient(contactData.user);
      setContactError(null);
    } catch (error) {
      setContactError("Recipient not found or error occurred.");
      setRecipient(null);
    } finally {
      setIsRecipientLoading(false);
    }
  };

  const handleRecipientBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const email = e.target.value.trim();
    if (email) {
      fetchRecipient(email);
    }
  };

  const onSubmit = async (data: any) => {
    if (isRecipientLoading) {
      console.log("Waiting for recipient data...");
      return;
    }

    if (!recipient) {
      console.error("Recipient not found. Please check the email.");
      return;
    }

    const selectedAccount = accounts.find(account => account.id === data.fromAccount);

    if (selectedAccount) {
      const recipientAccount = recipient.bankAccounts.find((account: any) => account.account_type === 'chequing');

      if (recipientAccount) {
        const transferData = {
          toContact: data.toContact,
          fromAccount: selectedAccount.id,
          receiverAccount: recipientAccount.id,
        };

        setTransferData(transferData);
        console.log("Transfer data:", transferData);
        router.push(`/transactions/transfer/confirm`);
      } else {
        console.error("Recipient does not have a chequing account.");
      }
    } else {
      console.error("Sender's account not found.");
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4, p: 3, borderRadius: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
      Transfer to someone else	
      </Typography>
      <Typography variant="body2" color="textSecondary" mb={2}>
      Select the account to send from and enter the recipient's email 
      </Typography>

      {isLoading ? (
        <div>Loading balances...</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* FROM Account */}
          <Controller
            name="fromAccount"
            control={control}
            rules={{ required: "Please select an account" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                select
                label="From Account"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                margin="normal"
              >
                {accounts.map((account) => (
                  <MenuItem key={account.id} value={account.id}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                      <Typography>{account.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        ${account.balance && !isNaN(account.balance)
                          ? account.balance.toFixed(2)
                          : "0.00"}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* TO Contact (Email input) */}
          <Controller
            name="toContact"
            control={control}
            rules={{
              required: "Please enter a recipient email",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Recipient Email"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                margin="normal"
                onBlur={handleRecipientBlur} // Trigger recipient fetch only on blur
              />
            )}
          />

          {/* Display recipient error if applicable */}
          {contactError && (
            <Typography variant="body2" color="error" mt={2}>
              {contactError}
            </Typography>
          )}

          {/* Buttons */}
          <Box mt={2} display="flex" gap={2}>
            <Button fullWidth variant="outlined" color="secondary" onClick={() => router.push(`/overview`)}>
              Cancel
            </Button>
            <Button
  fullWidth
  type="submit"
  variant="contained"
  color="primary"
  disabled={isRecipientLoading || !recipient}
>
  Next
</Button>
          </Box>
        </form>
      )}
    </Box>
  );
}
