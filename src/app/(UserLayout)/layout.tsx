"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import Sidebar2 from "./layout/sidebar/NAVHOME"; // Only show Sidebar2 on specific pages
import Footer from "./footer/Footer";
import { usePathname } from "next/navigation";
import Footersmall from "./footer2/smallFooter";
import BankCardRow from "./components/blocks/BankCardRow";
import Subheader from "./subheader/subheader"; // Import your Subheader component

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
  const showFootersmall = ["/accounts/chequing", "/overview", "/accounts/savings"].includes(pathname);

  const showHomeNav = ["/", "/login"].includes(pathname);

  // Define pages where subheader should appear
  const isLargerContainer = [
    "/overview",
    "/transactions/transfer/confirm",
    "/accounts/chequing",
    "/accounts/savings",
    "/transactions/transfer",
    "/transactions/deposit",
    "/transactions/movemoney",
  ].includes(pathname);

  // Function to toggle the mobile sidebar
  const onMobileSidebarToggle = () => {
    setMobileSidebarOpen(!isMobileSidebarOpen);
  };



  
  return (
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
        {/* {isSubheaderPage && <Subheader toggleMobileSidebar={onMobileSidebarToggle} />} */}
        {/* ------------------------------------------- */}
        {/* PageContent */}
        {/* ------------------------------------------- */}


              {/* ------------------------------------------- */}
      {/* TO:DO: MAKE MEDIA QUERYS TO CONTROL maxWidth BREAKPOINTS */}
      {/* ------------------------------------------- */}
      
        <Container
  sx={{
    paddingTop: "20px",
    maxWidth: isLargerContainer ? "1600px !important" : "1200px", // Default to 1200px, 2500px for specific pages
  }}
>
  {/* Page Content */}
  <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
</Container>

        {showHomeCard && <BankCardRow />}
        {showFooter && <Footer />}
        {showFootersmall && <Footersmall />}
      </PageWrapper>
    </MainWrapper>
  );
}
