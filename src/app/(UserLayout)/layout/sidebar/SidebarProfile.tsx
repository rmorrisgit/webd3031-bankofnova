import { Box, Button, Link, Typography, IconButton, Tooltip } from "@mui/material";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import LogoutIcon from '@mui/icons-material/Logout'; // Material UI Logout Icon

export const Profile = () => {
  const { data: session } = useSession(); // Get the session data
  const userName = session?.user?.name || "Guest"; // Default to "Guest" if not logged in

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={2}
      sx={{ m: 3, p: 3, bgcolor: "primary.light", borderRadius: "8px" }}
    >
      <Box>
        <Typography variant="h5" fontSize="16px" mb={1}>
          {session ? `Welcome, ${userName}!` : "Haven't an account?"}
        </Typography>
        {!session ? (
          <Button
            color="primary"
            target="_blank"
            disableElevation
            component={Link}
            href="/register"
            variant="contained"
            aria-label="signup"
            size="small"
          >
            Sign Up
          </Button>
        ) : (
          <Tooltip title="Sign out" arrow>
            {/* Explicitly wrap the IconButton with a div or Box */}
            <Box>
              <IconButton
                color="primary"
                aria-label="logout"
                onClick={() => signOut()}
                size="small"
              >
                <LogoutIcon /> {/* Material UI Logout Icon */}
              </IconButton>
            </Box>
          </Tooltip>
        )}
      </Box>
      <Box mt="-35px">
        <Image alt="Rocket Image" src="/images/backgrounds/rocket.png" width={100} height={100} />
      </Box>
    </Box>
  );
};
