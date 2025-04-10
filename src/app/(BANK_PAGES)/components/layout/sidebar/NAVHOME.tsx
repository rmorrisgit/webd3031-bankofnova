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
import { useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image"; // Import Image from next/image

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
  const theme = useTheme();
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));
  const isLG = useMediaQuery(theme.breakpoints.up("lg"));
  const isMD = useMediaQuery(theme.breakpoints.up("md"));

  // For the top-right IconMenu Button
  const MenuButton = () => (
    <IconButton
      color="inherit"
      aria-label="menu"
      onClick={onMobileSidebarToggle} // Toggle the mobile sidebar on button click
      sx={{
        position: 'absolute',
        top: 11,
        left: 16,
        zIndex: 9999, // Ensure the button appears on top
        backgroundColor: isMobileSidebarOpen ? 'white' : 'none !important', 
        borderRadius: isMobileSidebarOpen ? '4px' : 'none !important', // Conditionally set borderRadius based on sidebar state
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
          top: 18,
          left: 70,
          zIndex: 9999, // Ensure the logo stays on top
          width: 'auto',
        }}
      >
        <Image
          src="/images/logos/dark-logo3.svg"
          alt="Logo"
          width={150}  // Set a width for the logo
          height={50}  // Set a height for the logo
          style={{ height: 'auto' }}  // Keep the aspect ratio
        />
      </Box>
    </Link>
  );

  if (!isSpecialPage || isMD) return null;

  return (
    <>
      <MenuButton />
      {isMobileSidebarOpen && <LogoWithHover />}
      <Drawer
        anchor="left"
        open={isMobileSidebarOpen}
        onClose={onSidebarClose}
        variant="temporary"
        ModalProps={{
          keepMounted: true,
          disableScrollLock: true,
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "transparent",
            cursor: "default",
            zIndex: 100,
          },
        }}
        PaperProps={{
          sx: {
            borderTop: "none !important",
            zIndex: 100,
            boxShadow: "none",
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
            <UnauthSidebarItems />
          </Sidebar>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar2;
