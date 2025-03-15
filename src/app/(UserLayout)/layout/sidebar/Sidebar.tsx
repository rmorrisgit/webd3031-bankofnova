"use client";
import { useMediaQuery, Box, Drawer } from '@mui/material';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import SidebarItems from './SidebarItems';
import { Profile } from './SidebarProfile';
import { Sidebar, Logo } from 'react-mui-sidebar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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

  // Special pages where burger should always be visible
  const isSpecialPage = ['/', '/login', '/register'].includes(pathname);

  // Force mobile sidebar on special pages, ignoring lgUp
  if (isSpecialPage) {
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
              <UnauthSidebarItems />
            ) : (
              <>
              <Profile />
              <SidebarItems />
            </>
            )}
          </Sidebar>
        </Box>
      </Drawer>
    );
  }

  // For lgUp (large screens) rendering
  if (lgUp) {
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
              {shouldRenderAuthenticatedSidebar ? (
                <>
                  <Profile />
                  <SidebarItems />
                </>
              ) : (
                <UnauthSidebarItems />
              )}
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

  // Fallback: Return the mobile version of the sidebar for small screens
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
            <UnauthSidebarItems />
          ) : (
            <>
            <Profile />
            <SidebarItems />
          </>
          )}
        </Sidebar>
      </Box>
    </Drawer>
  );
};

export default MSidebar;
