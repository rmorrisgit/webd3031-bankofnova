// components/Profile.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();

  if (!session) {
    return null; // If there's no session, don't show the profile
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* You can also display email or other details here */}
      <Typography variant="body2">{session.user?.email}</Typography>
    </Box>
  );
};

export default Profile;
