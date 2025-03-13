"use client"; // Ensure this runs only on the client side

import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"; // Import auth functions
import { IconMenu } from '@tabler/icons-react';
import Profile from './Profile';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@mui/material'; // Import useMediaQuery

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  return (
    <HeaderContent toggleMobileSidebar={toggleMobileSidebar} />
  );
};

const HeaderContent = ({ toggleMobileSidebar }: ItemType) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted
  const [isOnAuthPages, setIsOnAuthPages] = useState(false); // Track if on auth-related pages
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg')); // Check for large screens (lg and up)

  useEffect(() => {
    // Set the mounted state to true after the component is mounted
    setIsMounted(true);
  }, []); // This will run only once after the component mounts

  useEffect(() => {
    // Set the `isOnAuthPages` state based on the pathname
    if (pathname === '/' || pathname === '/login' || pathname === '/register') {
      setIsOnAuthPages(true);
    } else {
      setIsOnAuthPages(false);
    }
  }, [pathname]); // Runs whenever the pathnameachanges

  useEffect(() => {
    // Reset loading state when session status changes
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
    display: 'flex',
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center the toolbar items vertically
    position: 'relative', // Make sure the toolbar elements don't overlap
  }));

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Log out without redirecting
    // Optionally you can redirect to login page after logout
    window.location.href = '/login'; // Manually trigger a page reload
  };

  const handleMyAccountsClick = () => {
    window.location.href = '/userprofile'; // Navigate to "My Accounts" page using location.href
  };

  // Only render after the component is mounted on the client
  if (!isMounted) {
    return null; // Return null while the component is loading on the client side
  }

  // Define restricted paths for the hamburger menu
  const restrictedPaths = ['/userprofile', '/accounts/chequing', '/accounts/savings', '/transactions'];

  // Check if the current pathname is a restricted path
  const isRestrictedPath = restrictedPaths.includes(pathname);

  // Check if the current page is /userprofile
  const isUserProfilePage = ['/userprofile', '/accounts/chequing', '/accounts/savings', '/transactions'].includes(pathname);

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* Hamburger Menu for Mobile */}
        {/* Hide on /userprofile page when lgUp, show on restricted paths or small screens */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: 
              (isUserProfilePage && lgUp) ? "none" : 
              (isRestrictedPath || !lgUp) ? "inline" : "inline", // Combining both conditions
            position: 'absolute', // Position menu icon on the left side
            left: 10, // Distance from the left side
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        {/* Right side: Login/Logout, Profile, or My Accounts */}
        <Stack spacing={1} direction="row" alignItems="center" sx={{ position: 'absolute', right: 10 }}>
          {!session ? (
            <Box sx={{ paddingTop: 2 }}>
              <Button variant="contained" component={Link} href="/login" color="primary" sx={{ marginBottom: 2, marginRight: 2 }}>
                Login
              </Button>
              <Button variant="contained" component={Link} href="/register" color="primary" sx={{ marginBottom: 2 }}>
              Register
            </Button>
          </Box>
          ) : (
            <>
              {isOnAuthPages ? (
                // If on homepage, login, or register, show "My Accounts" instead of logout
                <Button variant="contained" onClick={handleMyAccountsClick} color="primary">
                  My Accounts
                </Button>
              ) : (
                // Otherwise, show logout button
                <Button variant="contained" onClick={handleLogout} color="secondary">
                  Logout
                </Button>
              )}
              <Profile /> {/* Only visible when the user is logged in */}
            </>
          )}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
