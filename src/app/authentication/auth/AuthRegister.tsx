"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas/registerSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, Stack, TextField, Card, Chip, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { signIn } from "next-auth/react";

interface RegisterFormProps {
  subtext?: React.ReactNode;
  subtitle?: React.ReactNode;
}

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterForm({ subtext, subtitle }: RegisterFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || "Registration failed");
      }

      alert("Registration successful! Redirecting to login...");
      router.push("/login");
    } catch (error: any) {
      setServerError(error.message);
    }
  };

  return (

  <Card
    elevation={9}
    sx={{ p: 6, zIndex: 1, width: "100%",
        // Adding responsive styles for different breakpoints
        "@media (max-width:600px)": {
          p: 4, // Less padding for small screens (phones)
          marginBottom: '25px',
          marginLeft: "auto",
          marginRight: "auto",
        },
        "@media (max-width:1044px)": {
          p: 4, // Adjust padding for medium-sized screens (tablets)
        },
      }}
    >
    {/* Form Section */}
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"

      width="100%"
    >
      <input
        type="text"
        name="fakeUsername"
        style={{ display: "none" }}
        autoComplete="username"
      />
      <input
        type="password"
        name="fakePassword"
        style={{ display: "none" }}
        autoComplete="new-password"
      />

      <Typography variant="h3" fontWeight="700"  mb="33px" >
      Register
      </Typography>

      {subtext && (
        <Box mb={2} textAlign="center">
          {subtext}
        </Box>
      )}

    <Typography variant="h3" fontWeight="700" mb="25px" >
      Create your Username and PIN
    </Typography>


    <Stack spacing={2} width="100%" maxWidth="400px">

      {serverError && (
        <Typography color="error" textAlign="center" mb={2}>
          {serverError}
        </Typography>
      )}

      {subtitle && (
        <Box mb={2} textAlign="center">
          {subtitle}
        </Box>
      )}

      <TextField
        label="Name"
        fullWidth
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
        variant="outlined"
        placeholder="Enter your name"
        sx={{maxWidth: '320px'}}
      />

      <TextField
        label="Password"
        fullWidth
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        variant="outlined"
        placeholder="Enter your password"
        sx={{maxWidth: '320px',
          marginBottom: '25px !important',
          marginTop: '25px !important'
        }}
      />

      <Typography variant="h3" fontWeight="700">
        Enter your email address
      </Typography>

      <TextField
  label="Email"
  fullWidth
  type="email"
  {...register("email")}
  error={!!errors.email}
  helperText={errors.email?.message}
  variant="outlined"
  placeholder="Enter your email"
  sx={{
    marginBottom: '15px !important', // Adjust the value to your preference
    maxWidth: '320px',
    marginTop: '25px !important'

  }}
/>

    <Button
      color="primary"
      variant="contained"
      type="submit"
      disableElevation
      disabled={isSubmitting}
      sx={{
        width:"120px",
        height: '44px',
        marginBottom: '20px !important',
        borderRadius: '10px' ,
        marginTop: '6px',
      }}
    >
    <Typography variant="h6">
    {isSubmitting ? "Registering..." : "Register"}
      </Typography>
  </Button>

    <Typography textAlign="left" color="textSecondary" variant="body2">
      Already have an account?{" "}
      <Typography
        component="a"
        href="/login"
        sx={{
          
          color: "primary.main",
          textDecoration: "none",
          fontWeight: "bold",
          marginLeft: '10px'
        }}
      >
        Sign In
      </Typography>

    </Typography>
  </Stack>
</Box>

<Divider sx={{ maxWidth: '406px', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
  <Typography sx={{ padding: '0 10px' }}>or</Typography>
</Divider>

    {/* Third-party Logins */}
    <Stack direction="column" spacing={2} mt={4} width="100%" >
      <Button
        variant="outlined"
        color="primary"
        onClick={() => signIn("google")}
        startIcon={<GoogleIcon />}
        sx={{maxWidth: '406px'}}

        
      >
        Sign up with Google
      </Button>

      <Button
        variant="outlined"
        color="primary"
        onClick={() => signIn("github")}
        startIcon={<GitHubIcon />}
        sx={{maxWidth: '406px'}}

      >
        Sign in with GitHub
      </Button>
    </Stack>
  </Card>
  );
}

