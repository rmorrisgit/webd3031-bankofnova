import { Box, Drawer, IconButton } from "@mui/material";

import UnauthSidebarItems from "./UnauthSidebarItems";
import { Sidebar } from 'react-mui-sidebar';
import { usePathname } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';

import MenuIcon from '@mui/icons-material/Menu'; // Import Menu Icon
import { useState } from 'react';
import Link from 'next/link';
import Profile from "../header/Profile";
import { SidebarProfile } from "./SidebarProfile";
import theme from "@/utils/theme";

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
  onMobileSidebarToggle: () => void;
}

const Sidebar2 = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
  onMobileSidebarToggle,
}: ItemType) => {
  const pathname = usePathname();
  const isSpecialPage = ['/', '/login', '/register'].includes(pathname);

  // For the top-right IconMenu Button
  const MenuButton = () => (
    <IconButton
      color="inherit"
      aria-label="menu"
      onClick={onMobileSidebarToggle} // Toggle the mobile sidebar on button click
      sx={{
        position: 'fixed',
        top: 11,
        left: 10,
        zIndex: 9999, // Ensure the button appears on top
        backgroundColor: isMobileSidebarOpen ? 'white' : 'none !important', 
        borderRadius: isMobileSidebarOpen ? '4px' : 'none !important', // Conditionally set borderRadius based on sidebar state
        // borderRadius: '4px', 
    
      }}
    >
      {isMobileSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
  );

  // Logo component to ensure it stays on top permanently
  const LogoWithHover = () => (
    <Link href="/" passHref>
      <Box
        sx={{
          position: "fixed", // Fix the logo position to stay on top
          top: 10, // Adjust top position to ensure it's visible
          left: "170px",
          transform: "translateX(-50%)", // Center the logo horizontally
          zIndex: 9999, // Ensure the logo stays on top
          width: 'auto',
        }}
      >
        <img src="/images/logos/dark-logo3.svg" alt="Logo" style={{ height: 'auto' }} />
      </Box>
    </Link>
  );

  if (isSpecialPage) {
    return (
      <>
        <MenuButton />
        
        {/* Logo stays permanently above the sidebar */}
        <LogoWithHover />

        <Drawer
          anchor="left"
          open={isMobileSidebarOpen}
          onClose={onSidebarClose}
          variant="temporary"
          ModalProps={{
            keepMounted: true,
            disableScrollLock: true, // Prevents scroll locking
          }}
          BackdropProps={{
            sx: { 
              backgroundColor: 'transparent',
              cursor: 'default',
              zIndex: 100, // Lower z-index for the sidebar backdrop
            },
          }}
          PaperProps={{
            sx: { 
              borderTop: 'none !important',
              backgroundColor: '#cdcdcd',
              zIndex: 100, // Lower z-index for the sidebar
              boxShadow: 'none',      //borderRight
            },
          }}
        >
          <Box px={2}>
            <Sidebar
              collapsewidth="80px"
              isCollapse={false}
              mode="light"
              direction="ltr"
              themeColor="#5d87ff"
              themeSecondaryColor="#49beff"
              showProfile={false}
            >

              {/* // Sidebar Items*/}
              <UnauthSidebarItems />
              {/* <SidebarProfile />    // Signup or username */}

            </Sidebar>
          </Box>
        </Drawer>
      </>
    );
  }

  return null;
};

export default Sidebar2;