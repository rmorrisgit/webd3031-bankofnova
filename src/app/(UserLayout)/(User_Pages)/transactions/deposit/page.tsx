"use client";

import {
  Card,
  Grid,
  Box,
  Typography,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox
} from "@mui/material";
import PageContainer from "../../../components/container/PageContainer";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Employer } from "../../../../../lib/types";

const Transaction = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<"chequing" | "savings">("chequing");
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [selectedEmployers, setSelectedEmployers] = useState<number[]>([]);

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        const response = await fetch("/api/user/employers");
        if (!response.ok) throw new Error("Failed to fetch employers");
        const data = await response.json();
  
        // Assign a random amount between $50 and $500 to each employer
        const employersWithRandomAmounts = data.map((employer: Employer) => {
          const randomAmount = (Math.random() * 450 + 50).toFixed(2);  // Random amount between 50 and 500
          return {
            ...employer,
            amount: parseFloat(randomAmount),  // Convert string to number
          };
        });
  
        setEmployers(employersWithRandomAmounts);
      } catch (err) {
        setError("Failed to fetch employers");
      }
    };
  
    fetchEmployers();
  }, []);
  

  const handleDeposit = async (
    accountType: "chequing" | "savings",
    employerId: string | null,
    depositAmount: string
  ) => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Invalid amount");
      return;
    }

    const roundedAmount = (Math.round(amount * 100) / 100).toFixed(2);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/user/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: roundedAmount,
          accountType,
          employerId,
          sender_account_id: employerId || null, // fallback to null
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Deposit successful!");
        router.push("/overview");
      } else {
        throw new Error(data.error || "Deposit failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Deposit request failed");
    }
  };

  const handleCheckboxToggle = (id: number) => {
    setSelectedEmployers((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const totalSelectedAmount = employers
    .filter((e) => selectedEmployers.includes(e.id))
    .reduce((sum, e) => sum + (e.amount ?? 100), 0);

  const handleBulkDeposit = async () => {
    for (const employer of employers) {
      if (selectedEmployers.includes(employer.id)) {
        await handleDeposit(
          selectedAccount,
          employer.id.toString(),
          (employer.amount ?? 100).toString()
        );
      }
    }
  };

  return (
    <PageContainer title="Deposit" description="This is your Deposit page">
      <Card
        elevation={0}
        sx={{
          p: 2,
          width: "100%",
          mt: "45px",
          mb: "35px",
          "@media (min-width:960px)": {
            width: "90%",
            mx: "auto",
          },
        }}
      >
        {status === "loading" ? (
          <div>Loading...</div>
        ) : session ? (
          <Box>
            <Grid item xs={12}>
              <CardContent>
                <Typography variant="h2">Deposit</Typography>
              </CardContent>
            </Grid>

            {/* Account Type Select */}
            <FormControl fullWidth sx={{ mb: 2, maxWidth: "320px" }}>
              <InputLabel>Account Type</InputLabel>
              <Select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value as "chequing" | "savings")}
                label="Account Type"
              >
                <MenuItem value="chequing">Chequing</MenuItem>
                <MenuItem value="savings">Savings</MenuItem>
              </Select>
            </FormControl>

            {/* Selected Tally */}
            {selectedEmployers.length > 0 && (
              <Typography sx={{ mb: 1, fontWeight: 600 }}>
                Selected Total: ${totalSelectedAmount.toFixed(2)}
              </Typography>
            )}

            {/* Employers Table */}
            {employers.length > 0 ? (
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Employer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
  {employers.map((employer) => {
    // Ensure the amount is a number
    const employerAmount = typeof employer.amount === "number" ? employer.amount : parseFloat(employer.amount || "0");
    
    return (
      <TableRow key={employer.id}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selectedEmployers.includes(employer.id)}
            onChange={() => handleCheckboxToggle(employer.id)}
          />
        </TableCell>
        <TableCell>{employer.name}</TableCell>
        <TableCell align="right">
          ${employerAmount.toFixed(2)}
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>

                </Table>
              </TableContainer>
            ) : (
              <Typography>No employers available for deposit.</Typography>
            )}

            {/* Bulk Deposit Button */}
            {selectedEmployers.length > 0 && (
              <Button
                variant="contained"
                color="success"
                onClick={handleBulkDeposit}
                sx={{ mb: 2 }}
              >
                Deposit from Selected Employers
              </Button>
            )}

            {message && <Typography color="success.main">{message}</Typography>}
            {error && <Typography color="error.main">{error}</Typography>}
          </Box>
        ) : (
          <div>You need to be logged in to view this page.</div>
        )}
      </Card>
    </PageContainer>
  );
};

export default Transaction;
