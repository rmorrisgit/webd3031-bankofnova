"use client";

import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  Divider,
  TextField
} from "@mui/material";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CustomTextField from "../../(DASHBOARD_PAGES)/components/forms/theme-elements/CustomTextField";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas/loginSchema";
import { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

const AuthLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [error, setError] = React.useState("");

  const onSubmit = async (data: LoginFormData) => {
    const res = await signIn("credentials", {
      redirect: false,
      identifier: data.email,
      password: data.password,
    });

    if (res?.error) {
      if (res.error === "CredentialsSignin") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(res.error);
      }
    } else {
      setError("");
      const session = await getSession();

      if (session?.user?.role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/overview");
      }
    }
  };

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center">
      <Card
        elevation={9}
        sx={{
          p: 6,
          zIndex: 1,
          mt: 5,
          width: "100%",
          "@media (max-width:600px)": {
            p: 4,
            marginBottom: "25px",
            marginLeft: "auto",
            marginRight: "auto",
          },
          "@media (max-width:1044px)": {
            p: 4,
            boxShadow: 'none !important',

          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <input type="text" name="fakeUsername" style={{ display: "none" }} autoComplete="username" />
          <input type="password" name="fakePassword" style={{ display: "none" }} autoComplete="new-password" />

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={4}
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Stack spacing={2} width="100%" maxWidth="400px">
              <Typography variant="h3" fontWeight="700">
                Login
              </Typography>

              <TextField
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                placeholder="Enter your email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  marginTop: "25px !important",
                  marginBottom: "15px !important",
                }}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                placeholder="Enter your password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{
                  marginTop: "15px !important",
                  marginBottom: "15px !important",
                }}
              />

              {error && (
                <Typography color="error" textAlign="center" mb={1}>
                  {error}
                </Typography>
              )}

            <Button
              color="primary"
              variant="contained"
              type="submit"
              disableElevation
              sx={{ width: "80px", height: "44px", borderRadius: "7px" }}
            >
              <Typography variant="h6">Login</Typography>
            </Button>

              <Divider sx={{ mt: 3, display: { xs: "flex", md: "none" } }}>
                <Typography sx={{ px: 2 }}>or</Typography>
              </Divider>
            </Stack>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                minHeight: "280px", // or match the height of form stack
              }}
            >
              <Divider orientation="vertical" flexItem>
                <Typography sx={{ writingMode: "vertical-rl", transform: "rotate(270deg)" }}>
                  or
                </Typography>
              </Divider>
            </Box>

            <Stack spacing={2} width="100%" maxWidth="400px">
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => signIn("google")}
                startIcon={<GoogleIcon />}
                sx={{ mt: { xs: 2, md: 0 } }}
              >
                Sign in with Google
              </Button>

              <Button
                variant="outlined"
                color="inherit"
                onClick={() => signIn("github")}
                startIcon={<GitHubIcon />}
              >
                Sign in with GitHub
              </Button>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
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
                marginTop: "14px",
              }}
            >
              Create an account
            </Typography>
          </Stack>
        </form>
      </Card>
    </Box>
  );
};

export default AuthLogin;
