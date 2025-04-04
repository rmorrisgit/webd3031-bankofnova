import { Box, Drawer, IconButton, AppBar, Toolbar, Backdrop } from "@mui/material";
import SidebarItems from './SidebarItems';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined"; // Closed menu icon
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined"; // Open menu icon

import { Sidebar, Logo } from 'react-mui-sidebar';
import Profile from "../header/Profile";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from "@mui/material";

const HEADER_HEIGHT = 64; // Adjust based on your design
const SIDEBAR_WIDTH = 256; // Sidebar width when open
const SIDEBAR_COLLAPSED_WIDTH = 73; // Sidebar width when collapsed (skinny)
const SIDEBAR_HEIGHT = 200;
const SIDEBAR_WIDTH_XS = 270; // New width for isXs





interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
  onMobileSidebarToggle: () => void;
}

const LogoWithHover = () => (
  <Link href="/" passHref>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            marginTop: '-1px',
            left: 40,
            zIndex: 9999,
          }}
        >
      <Logo img="/images/logos/dark-logo3.svg" />
    </Box>
  </Link>
);

const MSidebar = ({ isSidebarOpen }: ItemType) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const theme = useTheme();

  // Media queries for breakpoints
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'));

  // New query for small screens
  const isXs = useMediaQuery('(max-width: 900px)'); // Custom xs breakpoint

  const [isSidebarToggled, setIsSidebarToggled] = useState(false);

  // Toggle the sidebar on small screens
  const toggleSidebar = () => {
    setIsSidebarToggled((prev) => !prev); // Toggle the sidebar state
    console.log(isSidebarToggled ? "Sidebar Open" : "Sidebar Collapsed");
  };

  // Default sidebar behavior based on breakpoints
  useEffect(() => {
    if (isXlUp) {
      setIsSidebarToggled(true); // Sidebar open on lgUp
    } else if (isMdUp) {
      setIsSidebarToggled(false); // Sidebar permanently closed on mdUp
    } else if (isSmUp) {
      setIsSidebarToggled(false); // Sidebar closed on smUp
    }
  }, [isXlUp, isMdUp, isSmUp]);

  const isSpecialPage = ['/', '/login'].includes(pathname || '');

  if (isSpecialPage || status !== 'authenticated') {
    return null;
  }

  // Close sidebar when backdrop is clicked
  const handleBackdropClick = () => {
    setIsSidebarToggled(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "transparent", boxShadow: "none" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <IconButton onClick={toggleSidebar} edge="start">
            {isSidebarToggled ? <MenuOpenOutlinedIcon /> : <MenuOutlinedIcon />}
          </IconButton>

          <LogoWithHover />

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
            <Profile />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          // marginLeft: isMdUp || isXlUp ? (isSidebarToggled || isXlUp ? `${SIDEBAR_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`) : 0, // Only add margin on mdUp
          transition: 'margin-left 0.3s ease',
          marginLeft: isXlUp
          ? (isSidebarToggled ? `${SIDEBAR_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`)  // Adjust margin for lgUp based on sidebar state
          : isMdUp  // For mdUp and below, apply similar logic
          ? (isSidebarToggled ? `${SIDEBAR_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`)
          : 0, // No margin for xs or sm
        }}
      >
        <Drawer
          anchor="left"
          open={isSidebarToggled}
          variant={isMdUp || isXlUp ? 'permanent' : 'persistent'}
          onClose={isMdUp ? () => {} : undefined}  // No closing automatically in permanent mode
          PaperProps={{
            sx: {
              width: `${isXs ? SIDEBAR_WIDTH_XS : isSidebarToggled ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH}px`,
              height: `${SIDEBAR_HEIGHT}`,
              boxShadow: 'none',
              borderRight: 'none',
              display: 'flex',
              overflowX: "hidden",

              flexDirection: 'column',
              // marginTop: isMdUp ? 0 : `${HEADER_HEIGHT}px`,
            },
          }}
        >
          <Box sx={{ height: '100%',  }}>
            <Sidebar
              width={`${isSidebarToggled ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH}px`}
              collapsewidth={`${SIDEBAR_COLLAPSED_WIDTH}px`} // Ensures proper collapse
              showProfile={false}
              sx={{
                
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Centers items vertically
                justifyContent: "center", // Ensures alignment
              }}
            >
          <SidebarItems isSidebarToggled={isSidebarToggled} />
      </Sidebar>
    </Box>
  </Drawer>

        {/* Backdrop for xs screens */}
        {isXs && isSidebarToggled && (
          <Backdrop
            open={isSidebarToggled}
            onClick={handleBackdropClick}
            sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}
          />
        )}
      </Box>
    </Box>
  );
};

export default MSidebar;
