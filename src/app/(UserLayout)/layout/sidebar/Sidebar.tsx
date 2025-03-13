"use client";
import { useMediaQuery, Box, Drawer, IconButton } from '@mui/material';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import SidebarItems from './SidebarItems';
import { Profile } from './SidebarProfile';
import { Sidebar, Logo } from 'react-mui-sidebar';
import Link from 'next/link';
import { IconMenu } from '@tabler/icons-react';  // Import the icon directly
import { useEffect, useState, useMemo } from 'react';
import UnauthSidebarItems from './UnautenticatedSidebarItems'; // Corrected import

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
  onMobileSidebarToggle: () => void; // Add this for toggle functionality
}

const LogoWithHover = () => (
  <Link href="/" passHref>
    <Box
      sx={{
        '&:hover': {
          opacity: 0.8, // Change opacity on hover for effect
        },
        display: 'flex',
        justifyContent: 'center', // Center the logo horizontally
        alignItems: 'center', // Center the logo vertically
        width: '100%', // Make sure it takes up full width
      }}
    >
      <Logo img="/images/logos/dark-logo.svg" />
    </Box>
  </Link>
);

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
  onMobileSidebarToggle, // Pass this toggle function to the component
}: ItemType) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  // Add state for client-side checks
  const [lgUp, setLgUp] = useState(false);

  // Memoize menu items for optimization
  const memoizedUnauthenticatedMenuItems = useMemo(() => UnauthSidebarItems, []);
  const memoizedSidebarItems = useMemo(() => SidebarItems, []);

  // Custom scrollbar styles
  const scrollbarStyles = {
    '&::-webkit-scrollbar': { width: '7px' },
    '&::-webkit-scrollbar-thumb': { backgroundColor: '#eff2f7', borderRadius: '15px' },
  };

  // Check the screen size (lgUp) only after the component has mounted (client-side)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1200px)');
    setLgUp(mediaQuery.matches);

    // Listen for changes in the screen size
    const handleResize = () => {
      setLgUp(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleResize);

    // Cleanup listener
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  // Sidebar logic for authenticated users
  const shouldRenderAuthenticatedSidebar = status === 'authenticated';

  // Sidebar logic for non-authenticated users
  const shouldRenderUnauthenticatedSidebar = status === 'unauthenticated';

  // If not authenticated, always show hamburger menu (does not rely on excluded pages now)
  if (lgUp && !shouldRenderAuthenticatedSidebar) {
    return (
      <Box sx={{ width: '270px', flexShrink: 0 }}>
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: { boxSizing: 'border-box', ...scrollbarStyles },
          }}
        >
          <Box sx={{ height: '100%' }}>
            <Sidebar width="270px" collapsewidth="80px" open={isSidebarOpen} themeColor="#ff5733" themeSecondaryColor="#ff8c42" showProfile={false}>
              <LogoWithHover /> {/* Logo with hover effect */}
              <UnauthSidebarItems />

            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  // Render authenticated sidebar for large screens
  if (shouldRenderAuthenticatedSidebar && lgUp) {
    return (
      <Box sx={{ width: '270px', flexShrink: 0 }}>
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: { boxSizing: 'border-box', ...scrollbarStyles },
          }}
        >
          <Box sx={{ height: '100%' }}>
            <Sidebar width="270px" collapsewidth="80px" open={isSidebarOpen} themeColor="#5d87ff" themeSecondaryColor="#49beff" showProfile={false}>
              <LogoWithHover /> {/* Logo with hover effect */}
              <Box>
                <Profile />
                <SidebarItems />
              </Box>
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  // Render non-authenticated sidebar for large screens
  if (shouldRenderUnauthenticatedSidebar && lgUp) {
    return (
      <Box sx={{ width: '270px', flexShrink: 0 }}>
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: { boxSizing: 'border-box', ...scrollbarStyles },
          }}
        >
          <Box sx={{ height: '100%' }}>
            <Sidebar width="270px" collapsewidth="80px" open={isSidebarOpen} themeColor="#ff5733" themeSecondaryColor="#ff8c42" showProfile={false}>
              <LogoWithHover /> {/* Logo with hover effect */}
              <UnauthSidebarItems />

            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  // Sidebar logic for mobile sizes (authenticated or unauthenticated)
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{ sx: { boxShadow: (theme) => theme.shadows[8], ...scrollbarStyles } }}
    >
      <Box px={2}>
        <Sidebar width="270px" collapsewidth="80px" isCollapse={false} mode="light" direction="ltr" themeColor="#5d87ff" themeSecondaryColor="#49beff" showProfile={false}>
          <LogoWithHover /> {/* Logo with hover effect */}
          {shouldRenderUnauthenticatedSidebar ? (
            // Map through the items for unauthenticated users
            <UnauthSidebarItems />

          ) : (
            // Render authenticated items for logged-in users
            <SidebarItems />
          )}
          {shouldRenderAuthenticatedSidebar && <Profile />}
        </Sidebar>
      </Box>
    </Drawer>
  );
};

export default MSidebar;
