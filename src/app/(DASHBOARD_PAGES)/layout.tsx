"use client";

import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import { useMediaQuery, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import Footersmall from "./components/smallFooter";


import { ThemeRegistry } from "@/app/context/ThemeContext"; // adjust path as needed

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  flexDirection: "column",
  zIndex: 1,
  backgroundColor: "transparent",
}));

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));

  const isLargerContainer = ["/user-management"].includes(pathname);
  const isMediumContainer = ["/whatever"].includes(pathname);

  const onMobileSidebarToggle = () => {
    setMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <ThemeRegistry>
      <MainWrapper className="mainwrapper">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(true)}
          onMobileSidebarToggle={onMobileSidebarToggle}
        />
        <PageWrapper className="page-wrapper">
          <Header toggleMobileSidebar={onMobileSidebarToggle} />
          <Container
            sx={{
              maxWidth: isLargerContainer
                ? "1700px !important"
                : isMediumContainer && lgUp
                ? "1340px !important"
                : "1200px",
              ...(isMediumContainer && xlUp && {
                padding: "0 !important",
              }),
            }}
          >
            <Box sx={{ minHeight: "calc(100vh - 170px)", marginBottom: "40px" }}>
              {children}
            </Box>
            <Footersmall />
          </Container>
        </PageWrapper>
      </MainWrapper>
    </ThemeRegistry>
  );
}
