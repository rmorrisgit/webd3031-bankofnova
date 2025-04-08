import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname for current route detection
import {
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const { data: session } = useSession();
  const pathname = usePathname(); // Get the current route
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Detect small screens

  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/login";
  };

  // Check if the current route is specifically /login or /register
  const pathsWithBlueBackground = pathname === "/login" || pathname === "/register" || pathname === "/overview" || pathname === "/accounts/chequing";

  // Helper function to get the first letter of the name
  const stringAvatar = (name: string) => {
    return {
      children: `${name.split(" ")[0][0]}`, // First letter of first name
    };
  };

  return (
    <Box>
<IconButton
  size="large"
  aria-label="profile menu"
  color="inherit"
  aria-controls="msgs-menu"
  aria-haspopup="true"
  onClick={handleClick2}
  disableRipple={!!session}  // Disable ripple only if session exists
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
            padding: "0px",
          }),
        }}
      >
        {session?.user?.name ? (
          <Avatar
          variant="square"
            {...stringAvatar(session.user.name)} // Display the first letter of the user's name
            sx={{
              borderRadius: "4px",
              backgroundColor: pathsWithBlueBackground ? "primary.main" : "primary.main", // White on /login and /register
              color: pathsWithBlueBackground ? "white" : "white",
              marginRight: "15px",
            }}
          />
        ) : (
          <Avatar
          variant="rounded"
            sx={{
              backgroundColor: 'white', // White on /login and /register
              color: pathsWithBlueBackground ? "#000000" : "#000000",
              // backgroundColor: "primary.light", 
              // color: "Black",
              borderRadius: "50%",

            }}
          >
          <ManageAccountsOutlinedIcon  />
</Avatar>
          
        )}
      </IconButton>

      {/* Dropdown menu */}
      {session ? (
        <>
          <Menu
            id="msgs-menu"
            anchorEl={anchorEl2}
            keepMounted
            open={Boolean(anchorEl2)}
            onClose={handleClose2}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            disableScrollLock={true}  // Disable scroll lock

            sx={{
              "& .MuiMenu-paper": {
                width: "200px",
              },
            }}
          >
            <MenuItem>
              <ListItemIcon>
              <IconUser width={20} />
              </ListItemIcon>
              <ListItemText>My Profile</ListItemText>
            </MenuItem>
            {/* <MenuItem>
              <ListItemIcon>
                <IconMail width={20} />
              </ListItemIcon>
              <ListItemText>My Account</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <IconListCheck width={20} />
              </ListItemIcon>
              <ListItemText>My Tasks</ListItemText>
            </MenuItem> */}
            <Box mt={1} py={1} px={2}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLogout}
                fullWidth
              >
                Logout
              </Button>
            </Box>
          </Menu>
        </>
      ) : (
        <>
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          disableScrollLock={true}  // Disable scroll lock
          sx={{
            "& .MuiMenu-paper": {
              width: "200px",
            },
          }}
        >            
            <Box  py={1} px={2}>
              <Button
                component={Link}
                href="/register"
                variant="outlined"
                color="primary"
                fullWidth
                disableElevation
                sx={{
                  width: "100%",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
              Register
              </Button>
              </Box>

            <Box  px={2}>
              <Button
                component={Link}
                href="/login"
                variant="outlined"
                color="primary"

                fullWidth
                disableElevation
                sx={{
                  width: "100%",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              >
               Login
              </Button>
              </Box>
          </Menu>
        </>
      )}
    </Box>
  );
};

export default Profile;
