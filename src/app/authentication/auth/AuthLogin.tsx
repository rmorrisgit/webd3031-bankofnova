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
      setError(res.error);
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
          width: "100%",
          "@media (max-width:600px)": {
            p: 4,
            marginBottom: "25px",
            marginLeft: "auto",
            marginRight: "auto",
          },
          "@media (max-width:1044px)": {
            p: 4,
          },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <input type="text" name="fakeUsername" style={{ display: "none" }} autoComplete="username" />
          <input type="password" name="fakePassword" style={{ display: "none" }} autoComplete="new-password" />

          <Stack spacing={2} width="100%" maxWidth="400px">
            <Typography variant="h3" fontWeight="700" mb="20px">
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
                marginBottom: "25px !important",
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
              sx={{ width: "120px", height: "44px", borderRadius: "7px" }}
            >
              <Typography variant="h6">Login</Typography>
            </Button>

            <Divider sx={{ mt: 3 }}>
              <Typography sx={{ px: 2 }}>or</Typography>
            </Divider>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => signIn("google")}
              startIcon={<GoogleIcon />}
              sx={{ mt: 2 }}
            >
              Sign in with Google
            </Button>

            <Button
              variant="outlined"
              color="primary"
              onClick={() => signIn("github")}
              startIcon={<GitHubIcon />}
            >
              Sign in with GitHub
            </Button>

            <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
              <Typography color="textSecondary" variant="h6" fontWeight="500">
                New to Bank of Nova?
              </Typography>
              <Typography
                component={Link}
                href="/register"
                fontWeight="500"
                sx={{ textDecoration: "none", color: "primary.main" }}
              >
                Create an account
              </Typography>
            </Stack>
          </Stack>
        </form>
      </Card>
    </Box>
  );
};

export default AuthLogin;
