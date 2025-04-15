"use client";

import {
  Box,
  Typography,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
  Stack,
  Chip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema, EditProfileFormData } from "@/lib/schemas/editProfileSchema";

export default function ProfilePage() {
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [showAlert, setShowAlert] = useState(false);
  const [integrations, setIntegrations] = useState<null | { googleLinked: boolean; githubLinked: boolean }>(null);
  const [loadingIntegrations, setLoadingIntegrations] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    // Fetch user profile
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
          reset({
            name: data.user.name,
            email: data.user.email,
            password: "",
          });
        }
      })
      .finally(() => setLoading(false));

    // Fetch account integrations
    fetch("/api/user/account-integration")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIntegrations(data.data); // ✅ Corrected here
        }
      })
      .catch((err) => {
        console.error("Failed to fetch integrations:", err);
      })
      .finally(() => setLoadingIntegrations(false));
  }, [reset]);

  const handleEdit = () => {
    reset({
      name: user.name,
      email: user.email,
      password: "",
    });
    setOpenDialog(true);
    setShowAlert(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setShowAlert(false);
  };

  const onSubmit = async (data: EditProfileFormData) => {
    const res = await fetch("/api/user/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      setUser({ name: data.name, email: data.email });
      setSnackbar({ open: true, message: "Profile updated successfully!" });
      setOpenDialog(false);
      setShowAlert(false);
    } else {
      setSnackbar({ open: true, message: "Error: " + result.message });
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
            <Tab label="Details" />
            <Tab label="Edit Profile" />
            <Tab label="Linked Accounts" />
          </Tabs>

          {tab === 0 && (
            <Box>
              <Typography variant="h6">Name</Typography>
              <Typography sx={{ mb: 2 }}>{user.name}</Typography>
              <Typography variant="h6">Email</Typography>
              <Typography sx={{ mb: 2 }}>{user.email}</Typography>
            </Box>
          )}

          {tab === 1 && (
            <Box>
              <Button variant="contained" onClick={handleEdit}>
                Edit Info
              </Button>

              <Dialog
                open={openDialog}
                onClose={(event, reason) => {
                  if (reason === "backdropClick" || reason === "escapeKeyDown") return;
                  handleClose();
                }}
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle>Edit Profile</DialogTitle>
                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                  <DialogContent>
                    {showAlert && (
                      <Alert severity="info" variant="outlined" sx={{ mb: 2 }}>
                        You are about to change your login information. This includes your name, email, and password.
                      </Alert>
                    )}

                    <Stack spacing={2} mt={1}>
                      <TextField
                        margin="dense"
                        label="Name"
                        fullWidth
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                      />

                      <TextField
                        margin="dense"
                        label="Email"
                        fullWidth
                        disabled
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                      />

                      <TextField
                        margin="dense"
                        label="New Password"
                        type="password"
                        fullWidth
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                      />
                    </Stack>
                  </DialogContent>

                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                      Save
                    </Button>
                  </DialogActions>
                </Box>
              </Dialog>
            </Box>
          )}

          {tab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Linked Accounts
              </Typography>

              {loadingIntegrations ? (
                <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Stack spacing={3} mt={2}>
                  <Box>
                    <Typography>Google</Typography>
                    <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                      <Chip
                        label={integrations?.googleLinked ? "Google Linked" : "Google Not Linked"}
                        icon={integrations?.googleLinked ? <CheckCircleOutlineIcon color="success" /> : undefined}
                        style={{
                          backgroundColor: integrations?.googleLinked ? "#388E3C" : "#D32F2F",
                          color: "white",
                        }}
                      />
                    </Stack>
                  </Box>

                  <Box>
                    <Typography>GitHub</Typography>
                    <Stack direction="row" spacing={2} alignItems="center" mt={1}>
                      <Chip
                        label={integrations?.githubLinked ? "GitHub Linked" : "GitHub Not Linked"}
                        icon={integrations?.githubLinked ? <CheckCircleOutlineIcon color="success" /> : undefined}
                        style={{
                          backgroundColor: integrations?.githubLinked ? "#388E3C" : "#D32F2F",
                          color: "white",
                        }}
                      />
                    </Stack>
                  </Box>
                </Stack>
              )}
            </Box>
          )}
        </>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ open: false, message: "" })}
        message={snackbar.message}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiSnackbarContent-root": {
            maxWidth: "90vw",
            width: "auto",
            textAlign: "center",
          },
        }}
      />
    </Box>
  );
}
