"use client";

import { Grid, Box, Typography, CardContent, Button, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import PageContainer from "../../../components/container/PageContainer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchUserBalance } from "../../../../api/user";

const Transaction = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState<string>("0");
  const [selectedAccount, setSelectedAccount] = useState<"chequing" | "savings">("chequing"); // Restrict type to "chequing" or "savings"



  // Handle Deposit Button Click
// Handle Deposit Button Click
const handleDeposit = async (accountType: "chequing" | "savings") => {
  const amount = parseFloat(depositAmount);

  if (isNaN(amount) || amount <= 0) {
    setError("Please enter a valid deposit amount.");
    return;
  }

  setMessage(null); // Clear previous messages
  setError(null);

  // Round the deposit amount to two decimal places and convert to string
  const roundedAmount = (Math.round(amount * 100) / 100).toFixed(2);

  console.log("Deposit Amount:", depositAmount);
  console.log("Rounded Deposit Amount:", roundedAmount);
  console.log("Selected Account Type:", accountType);

  try {
    const response = await fetch("/api/user/deposit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: roundedAmount, accountType }), // Pass the account type
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Deposit successful!");
      // Redirect to /overview after successful deposit
      router.push("/overview");
    } else {
      throw new Error(data.error || "Deposit failed");
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : "Deposit request failed");
  }
};


  return (
    <PageContainer title="Overview" description="this is HOME">
      {status === "loading" ? (
        <div>Loading...</div>
      ) : session ? (
        <Box>
          <Typography variant="h1">Deposit</Typography>

          {/* Account Type Selection */}
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Account Type</InputLabel>
            <Select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value as "chequing" | "savings")} // Type assertion here
              label="Account Type"
            >
              <MenuItem value="chequing">Chequing</MenuItem>
              <MenuItem value="savings">Savings</MenuItem>
            </Select>
          </FormControl>

          {/* Deposit Amount Input */}
          <TextField
            label="Deposit Amount"
            type="number"
            variant="outlined"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)} // Store as string
            fullWidth
            sx={{ marginBottom: 2 }}
          />

          {/* Deposit Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDeposit(selectedAccount)} // Pass selectedAccount here
            sx={{ marginBottom: 2 }}
          >
            Deposit
          </Button>

          {message && <Typography color="success.main">{message}</Typography>}
          {error && <Typography color="error.main">{error}</Typography>}

        </Box>
      ) : (
        <div>You need to be logged in to view this page.</div>
      )}
    </PageContainer>
  );
};


export default Transaction;

