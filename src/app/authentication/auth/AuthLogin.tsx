"use client";

import React, { useState } from "react";
import { Box, Typography, Button, Stack, Card, Divider } from "@mui/material";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CustomTextField from "../../(DASHBOARD_PAGES)/components/forms/theme-elements/CustomTextField";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "next/link";

interface LoginProps {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: LoginProps) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [identifierError, setIdentifierError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!isValidEmail(identifier)) {
      setIdentifierError("Enter a valid email address.");
      hasError = true;
    } else {
      setIdentifierError("");
    }

    if (password.length === 0) {
      setPasswordError("Password cannot be empty.");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) return;

    const res = await signIn("credentials", {
      redirect: false,
      identifier,
      password,
    });

    if (res?.error) {
      setError(res.error);
      console.log("Login failed", res.error);
    } else {
      setError("");
      const session = await getSession();
      console.log("Session after login:", session);

      if (session?.user?.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/overview");
      }
    }
  };

  return (
    <Card
      elevation={9}
      sx={{
        p: 6,
        zIndex: 1,
        width: "100%",
        "@media (max-width:600px)": {
          p: 4,
          marginBottom: '25px',
          marginLeft: "auto",
          marginRight: "auto",
        },
        "@media (max-width:1044px)": {
          p: 4,
        },
      }}
    >
      <form onSubmit={handleLogin} autoComplete="off">
        <input type="text" name="fakeUsername" style={{ display: 'none' }} autoComplete="username" />
        <input type="password" name="fakePassword" style={{ display: 'none' }} autoComplete="new-password" />

        <Stack>
          <Typography variant="h3" fontWeight="700" mb="33px">Login</Typography>

          <Box>
            <CustomTextField
              label="Email"
              type="login"
              variant="outlined"
              sx={{
                width: '50%',
                '@media (max-width:800px)': { width: '100%' },
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setIdentifier(e.target.value)
              }
              error={!!identifierError}
              helperText={identifierError}
            />
          </Box>

          <Box mt="25px">
            <CustomTextField
              label="Password"
              type="password"
              variant="outlined"
              sx={{
                marginBottom: '15px !important',
                width: '50%',
                '@media (max-width:800px)': { width: '100%' },
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              error={!!passwordError}
              helperText={passwordError}
            />
          </Box>

          {error && (
            <Typography color="error" mt={2} textAlign="left">
              {error}
            </Typography>
          )}
        </Stack>

        <Box mt={3}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            type="submit"
            disableElevation
            sx={{ height: '44px' }}
          >
            <Typography variant="h6">Login</Typography>
          </Button>
        </Box>
      </form>

      <Divider sx={{
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        '@media (max-width:800px)': { width: '100%' },
      }}>
        <Typography sx={{ padding: '0 10px' }}>or</Typography>
      </Divider>

      <Stack direction="column" spacing={2} my={2} mt={4}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => signIn("google")}
          sx={{
            width: '50%',
            '@media (max-width:800px)': { width: '100%' },
          }}
          startIcon={<GoogleIcon />}
        >
          Sign up with Google
        </Button>

        <Button
          variant="outlined"
          color="inherit"
          onClick={() => signIn("github")}
          sx={{
            width: '50%',
            '@media (max-width:800px)': { width: '100%' },
          }}
          startIcon={<GitHubIcon />}
        >
          Sign in with GitHub
        </Button>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        justifyContent="left"
        mt={3}
        sx={{
          width: '50%',
          '@media (max-width:800px)': { width: '100%', justifyContent: "center" }
        }}
      >
        <Typography color="textSecondary" variant="h6" fontWeight="500">
          New to Bank of Nova?
        </Typography>
        <Typography
          component={Link}
          href="/register"
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
  );
};

export default AuthLogin;
