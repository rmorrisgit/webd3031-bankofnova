"use client"; // Ensures this runs only on the client

import { useMediaQuery, Box, Drawer } from '@mui/material';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation'; // ✅ Correct way to get the current path
import SidebarItems from './SidebarItems';
import { Upgrade } from './Updrade';
import { Sidebar, Logo } from 'react-mui-sidebar';

interface ItemType {
  isMobileSidebarOpen: boolean;
  onSidebarClose: (event: React.MouseEvent<HTMLElement>) => void;
  isSidebarOpen: boolean;
}

const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: ItemType) => {
  const { data: session, status } = useSession();
  const pathname = usePathname(); // ✅ Replace useRouter() with usePathname()
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const sidebarWidth = '270px';

  // Custom scrollbar styles
  const scrollbarStyles = {
    '&::-webkit-scrollbar': { width: '7px' },
    '&::-webkit-scrollbar-thumb': { backgroundColor: '#eff2f7', borderRadius: '15px' },
  };

  // ❌ Prevent Sidebar from rendering on Login, Register, or Home pages
  const excludedPages = ['/login', '/register', '/'];
  const shouldRenderSidebar = status === 'authenticated' && !excludedPages.includes(pathname);

  if (!shouldRenderSidebar) {
    return null;
  }



  if (lgUp) {
    return (
      <Box sx={{ width: sidebarWidth, flexShrink: 0 }}>
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
              <Logo img="/images/logos/dark-logo.svg" />
              <Box>
                <SidebarItems />
                <Upgrade />
              </Box>
            </Sidebar>
          </Box>
        </Drawer>
      </Box>
    );
  }

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
          <Logo img="/images/logos/dark-logo.svg" />
          <SidebarItems />
          <Upgrade />
        </Sidebar>
      </Box>
    </Drawer>
  );
};

export default MSidebar;
