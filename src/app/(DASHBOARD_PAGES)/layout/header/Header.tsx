"use client"; // Ensure this runs on the client side

import React from 'react';
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Badge, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useSession, signOut } from "next-auth/react"; // Import auth functions
import Profile from './admin_Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons-react';
import { Logo } from 'react-mui-sidebar';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}
const LogoWithHover = () => (
  <Link href="/" passHref>
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'lawngreen',
      }}
    >
      <Logo img="/images/logos/dark-logo3.svg" />
    </Box>
  </Link>
);
const HeaderContent = ({ toggleMobileSidebar }: ItemType) => {
  const { data: session } = useSession(); // Now safe to use

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    // background: theme.palette.background.paper,
        background: theme.palette.background.paper,
    justifyContent: 'center',
    // borderBottom: '1px solid #e0e0e0',
    color: 'lawngreen',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));
  
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,

  }));

  return (
    <AppBarStyled position="sticky" color="default" >
      <ToolbarStyled>

{/* <Box sx={{ display: { xs: 'none', md: 'block' } }}>
  <LogoWithHover />
</Box> */}
<Box sx={{ display: { xs: 'none', md: 'block' } }}>
  <LogoWithHover />
</Box>
        
        <Box flexGrow={1} />
        
         <Stack spacing={1} direction="row" alignItems="center">
          {!session ? (
            <Button variant="contained" component={Link} href="/login" color="primary">
              Login
            </Button>
          ) : (
            <>
            </>
            // <Button variant="contained" onClick={() => signOut({ callbackUrl: "/" })} color="secondary">
            //   Logout
            // </Button>
          )}
          <Profile />
        </Stack> 
      </ToolbarStyled>
    </AppBarStyled>
  );
};

const Header = ({ toggleMobileSidebar }: ItemType) => {
  return <HeaderContent toggleMobileSidebar={toggleMobileSidebar} />;
};

Header.propTypes = {
  toggleMobileSidebar: PropTypes.func.isRequired,
};

export default Header;
