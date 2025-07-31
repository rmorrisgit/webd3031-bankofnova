"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  useTheme,
  useMediaQuery,
  ClickAwayListener,
  Typography,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconListCheck,
} from "@tabler/icons-react";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { useThemeMode } from '../../../context/ThemeContext'; 
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Profile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dndMode, setDndMode] = useState(true);
  const [notifications, setNotifications] = useState(false);
const { toggleTheme, mode } = useThemeMode();

  const { data: session } = useSession();
  const pathname = usePathname();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    window.location.href = "/login";
  };

  const stringAvatar = (name: string) => ({
    children: name.split(" ")[0][0].toUpperCase(),
  });

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        {/* Profile Avatar */}
        <IconButton
          size="large"
          aria-label="profile menu"
          color="inherit"
          onClick={handleClick}
          sx={{
            color: "primary.main",
          }}
        >
          {session?.user?.name ? (
            <Avatar
              {...stringAvatar(session.user.name)}
              sx={{
                // bgcolor: theme.palette.grey[100],
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.success.light,

              }}
            />
          ) : (
            <Avatar
              sx={{
                width: 35,
                height: 35,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                borderRadius: "50%",
              }}
            >
              <ManageAccountsOutlinedIcon />
            </Avatar>
          )}
        </IconButton>

        {/* Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          disableScrollLock
          PaperProps={{
            elevation: 16,
            sx: {
              width: 260,
              borderRadius: "12px",
              padding: "16px",
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          <Box>
            {/* Welcome Text */}
            <Box mb={2}>
              <Typography component="span" variant="h6" sx={{ fontWeight: 400 }}>
                {session?.user?.name || "Guest"}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ opacity: 0.7 }}
              >
                {session
                  ? session.user.role === "admin"
                    ? "Administrator"
                    : ""
                  : "Please login"}
              </Typography>
            </Box>



            {/* Divider */}
            <Divider sx={{ mb: 1 }} />

            {/* Menu Items */}
            {/* <MenuItem component={Link} href="/profile" onClick={handleClose}>
              <ListItemIcon>
                <IconSettings width={20} />
              </ListItemIcon>
              <ListItemText>Profile Settings</ListItemText>
            </MenuItem> */}

<MenuItem onClick={toggleTheme}>
  <ListItemIcon>
    {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
  </ListItemIcon>
  <ListItemText>
    {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
  </ListItemText>
</MenuItem>


            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <IconLogout width={20} />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Box>
        </Menu>
      </Box>
    </ClickAwayListener>
  );
};

export default Profile;
