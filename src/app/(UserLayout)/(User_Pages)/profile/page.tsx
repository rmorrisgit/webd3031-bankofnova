'use client';

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
} from '@mui/material';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState({ name: '', email: '' });
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [showAlert, setShowAlert] = useState(false);  // State to control alert visibility

  useEffect(() => {
    fetch('/api/user/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
          setFormData((prev) => ({
            ...prev,
            name: data.user.name,
            email: data.user.email,
          }));
        }
      });
  }, []);

  const handleEdit = () => {
    setOpenDialog(true);  // Open the dialog
    setShowAlert(true);  // Show the alert when editing begins
  };

  const handleClose = () => {
    setOpenDialog(false);
    setShowAlert(false);  // Hide the alert when closing the dialog
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const res = await fetch('/api/user/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      setUser({ name: formData.name, email: formData.email });
      setSnackbar({ open: true, message: 'Profile updated successfully!' });
      setOpenDialog(false);
      setShowAlert(false);  // Hide the alert after saving
    } else {
      setSnackbar({ open: true, message: 'Error: ' + data.message });
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} sx={{ mb: 2 }}>
        <Tab label="Details" />
        <Tab label="Edit Profile" />
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
          
          {/* Dialog for editing profile */}
          <Dialog open={openDialog} onClose={handleClose}>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogContent>
              {/* Alert inside the dialog */}
              {showAlert && (
                <Alert
                  severity="info"
                  variant="outlined"
                  sx={{ mb: 2 }}  // margin bottom to create space from the form fields
                >
                  You are about to change your login information. This includes your name, email, and password.
                </Alert>
              )}
              
              <TextField
                margin="dense"
                label="Name"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="Email"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                label="New Password"
                fullWidth
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSave} variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ open: false, message: '' })}
        message={snackbar.message}
      />
    </Box>
  );
}
