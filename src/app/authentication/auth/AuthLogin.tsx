"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import { signIn } from "next-auth/react"; // Import signIn
import { useRouter } from "next/navigation"; // For navigation
import CustomTextField from "../../(DashboardLayout)/components/forms/theme-elements/CustomTextField";

interface LoginProps {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: LoginProps) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const res = await signIn("credentials", {
      redirect: false,
      identifier,
      password,
    });
  
    if (res?.error) {
      setError(res.error); // Display the error message if login fails
      console.log("Login failed", res.error);
    } else {
      setError("not successful"); // Clear the error message on successful login
      console.log("Login successful", res);
      router.push("/"); // Redirect to the dashboard after login
    }
  };
  

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <form onSubmit={handleLogin}>
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="email"
              mb="5px"
            >
              Email
            </Typography>
            <CustomTextField
              variant="outlined"
              fullWidth
              value={identifier}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdentifier(e.target.value)}
            />
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>
            <CustomTextField
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </Box>

          {error && (
            <Typography color="error" mt={2} textAlign="center">
              {error}
            </Typography>
          )}

          <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember this device"
              />
            </FormGroup>
            <Typography
              component={Link}
              href="/authentication/forgot-password"
              fontWeight="500"
              sx={{ textDecoration: "none", color: "primary.main" }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Stack>

        <Box>
          <Button color="primary" variant="contained" size="large" fullWidth type="submit">
            Sign In
          </Button>
        </Box>
      </form>

      {subtitle}
    </>
  );
};

export default AuthLogin;
