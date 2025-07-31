"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import Sidebar2 from "./layout/sidebar/NAVHOME"; // Only show Sidebar2 on specific pages
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import Footersmall from "./components/smallFooter";
import Subheader from "./components/subheader";
import { useMediaQuery, useTheme } from "@mui/material";
// import Subheader from "./components/subheader"; 
import Subheader2 from "./components/subheader2";
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

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();
  const showFooter = ["/"].includes(pathname);
  const showHomeCard = "/".includes(pathname);
  const showFootersmall = ["/accounts/chequing", "/overview", "/accounts/savings", "/transactions/transfer",
     "/transactions/deposit", "/payment"].includes(pathname);

  const showHomeNav = ["/", "/login"].includes(pathname);
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));

  const isLargerContainer = [

    "/trust/accounts",
    "/profile"
    
  ].includes(pathname);

  // Function to toggle the mobile sidebar
  const onMobileSidebarToggle = () => {
    setMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const isMediumContainer = [
    "/transactions/transfer/contact",
    "/transactions/transfer",   
    "/transactions/transfer/confirm",
    "/",  
    "/overview",
    "/accounts/savings",
    "/accounts/chequing", 
    // "transactions/transfer/contact",
    "/transactions/movemoney",
    "/transactions/deposit",

  ].includes(pathname);

  const isSubheaderPage = [
"/accounts/savings",
    "/accounts/chequing", 
  ].includes(pathname);
  const isSubheader2Page = [
"/accounts/savings",
    "/accounts/chequing", 
  ].includes(pathname);

  
  return (
        <ThemeRegistry>
    
    <MainWrapper className="mainwrapper">
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}
      
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(true)}
        onMobileSidebarToggle={onMobileSidebarToggle} // Passing the toggle function here
      />


      {/* Conditionally render Sidebar2 only on showHomeNav pages */}
      {showHomeNav && (
        <Sidebar2
          isSidebarOpen={isSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onSidebarClose={() => setMobileSidebarOpen(false)}
          onMobileSidebarToggle={onMobileSidebarToggle} // Passing the toggle function here
        />
      )}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        <Header toggleMobileSidebar={onMobileSidebarToggle} />
        {/* Conditionally render Subheader */}
        {isSubheaderPage && <Subheader toggleMobileSidebar={onMobileSidebarToggle} />}
        {/* ------------------------------------------- */}
        {/* {showHomeCard && <BankCardRow />} */}
        {isSubheader2Page && <Subheader2  toggleMobileSidebar={onMobileSidebarToggle} />}

<Container
  sx={{
    maxWidth: isLargerContainer
      ? "1700px !important"
      : isMediumContainer && lgUp
      ? "1340px !important"
      : "1200px"
  }}
>
  {/* Page Content */}
  <Box sx={{ minHeight: "calc(100vh - 170px)", marginBottom: '40px' }}>{children}</Box>
  {showFootersmall && <Footersmall />}

</Container>


        {showFooter && <Footer />}

      </PageWrapper>
    </MainWrapper>
  </ThemeRegistry>
  );
}
