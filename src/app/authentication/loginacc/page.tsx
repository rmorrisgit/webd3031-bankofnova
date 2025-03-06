"use client";
import Link from "next/link";
import { useState } from "react";
import { Grid, Box, Card, Stack, Typography, TextField, Button } from "@mui/material";
// components
import PageContainer from "../../(DashboardLayout)/components/container/PageContainer";
import Logo from "../../(DashboardLayout)/layout/shared/logo/Logo";
import { signIn } from "next-auth/react"; // Ensure that next-auth is being used

const LoginAccountNumber = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      identifier: accountNumber,  // Account number as identifier
      password,                   // Password entered by the user
    });

    if (res?.error) {
      setError("Invalid account number or password");
    } else {
      window.location.href = "/dashboard"; // Redirect on successful login (or change to the page you want)
    }
  };

  return (
    <PageContainer title="Login with Account Number" description="Login using your account number and password">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: "100vh" }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>

              <Typography variant="h4" textAlign="center" mb={2}>
                Login with Account Number
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Account Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && (
                  <Typography variant="body2" color="error" textAlign="center" mt={2}>
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Login
                </Button>
              </form>

              <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                <Typography color="textSecondary" variant="h6" fontWeight="500">
                  New to Modernize?
                </Typography>
                <Typography
                  component={Link}
                  href="/authentication/register"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Create an account
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default LoginAccountNumber;
