"use client"; // Ensure this runs only on the client side

import React from "react";
import { Box, AppBar, Toolbar, styled, Stack, IconButton, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react"; // Import auth functions
import MenuIcon from "@mui/icons-material/Menu";
import Profile from "./Profile";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "@mui/material"; // Import useMediaQuery
import { Logo } from "react-mui-sidebar";

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  return <HeaderContent toggleMobileSidebar={toggleMobileSidebar} />;
};

const HeaderContent = ({ toggleMobileSidebar }: ItemType) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery((theme: any) => theme.breakpoints.up("md"));
  const smUp = useMediaQuery((theme: any) => theme.breakpoints.up("sm"));

  const blueBackground = ["/register"].includes(pathname);

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: blueBackground ? theme.palette.primary.main : "white", // Use blueBackground state
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    position: "sticky", // This will make the header behave as a normal element

    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    // position: "relative",
  }));

  const handleLogout = async () => {
    await signOut({ redirect: false }); // Log out without redirecting
    window.location.href = "/login"; // Manually trigger a page reload
  };

  const handleMyAccountsClick = () => {
    window.location.href = "/overview"; // Navigate to "My Accounts" page
  };

  // if (status === "loading") {
  //   return (
  //     <AppBarStyled position="sticky" color="default">
  //       <ToolbarStyled>
  //         <Box>Loading...</Box>
  //       </ToolbarStyled>
  //     </AppBarStyled>
  //   );
  // }

  const isOnAuthPages = pathname === "/login";
  const isOnHomePage = pathname === "/";
  const isOnRegister = pathname === "/register";


  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* LEFT SIDE */}
        {/* {(isOnRegister) && <LogoWithHover />} */}
        {isOnRegister && (
  <Link href="/" passHref>
    <Box
      sx={{
        "&:hover": {
          opacity: 0.8, 
        },
        alignItems: "center",  // Vertically center logo
        marginTop: '-6px',
      }}
    >
      <img 
        src={blueBackground ? "/images/logos/dark-logo4.svg" : "/images/logos/dark-logo3.svg"} 
        alt="Logo"
        style={{ width: 'auto', }} // Adjust size as needed
      />
    </Box>
  </Link>
)}

        {/* Hamburger Menu */}
       <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            position: "absolute",
            marginTop: "1px",
            left: 33,
            display: isOnAuthPages || !isOnHomePage ? "none" : "none",
          }}
        >
          <MenuIcon sx={{ color: blueBackground ? "white" : "inherit" }} />
        </IconButton> 

        {/* RIGHT SIDE */}
        <Stack spacing={1} direction="row" alignItems="center" sx={{ position: "absolute", right: session ? 80 : 80 }}>
        {!session && !isOnRegister ? ( // Hide Register and Login buttons on /register page
            <>
              {smUp && (
                <Box mt={2}>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      component={Link}
                      href="/register"
                      color="primary"
                      size="large"
                      disableElevation
                      sx={{
                        height: "44px",
                        border: "1px solid white",
                        borderColor: blueBackground ? "white" : "primary.main",
                        backgroundColor: blueBackground ? "primary.main" : "white",
                        color: blueBackground ? "white" : "primary.main",
                        "&:hover": {
                          backgroundColor: blueBackground ? "" : "white",
                        },
                      }}
                    >
                      <Typography variant="h6">Register</Typography>
                    </Button>
                    <Button
                      variant="contained"
                      component={Link}
                      href="/login"
                      color="primary"
                      size="large"
                      disableElevation
                      sx={{
                        border: "1px solid white",
                        borderColor: blueBackground ? "white" : "white",
                        color: blueBackground ? "white" : "white",
                        backgroundColor: blueBackground ? "primary.main" : "theme.primary",
                      }}
                    >
                      <Typography variant="h6">Login</Typography>
                    </Button>
                  </Stack>
                </Box>
              )}
             {!smUp && <Profile />}

            </>
          ) : (
            <>
              {(isOnAuthPages || isOnHomePage) && session  ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={handleLogout}
                    color="primary"
                    disableElevation
                    sx={{
                      height: "44px",
                      backgroundColor: blueBackground ? "white" : "theme.primary",
                      color: blueBackground ? "theme.primary" : "theme.primary",
                      "&:hover": {
                        backgroundColor: blueBackground ? "white" : "",
                        border: blueBackground ? "1px solid #cdcdcd" : "",
                      },
                    }}
                  >
                    Logout
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleMyAccountsClick}
                    color="primary"
                    disableElevation
                    sx={{
                      height: "44px",
                      border: "1px solid white",
                      backgroundColor: "theme.primary",
                      color: "theme.primary !important",
                    }}
                  >
                    My Accounts
                  </Button>
                </>
              ) : (
                <></>
              )}
                  {(isOnAuthPages || !isOnHomePage) && session ? (  // Check if on auth or home page
      <>
        {/* <Profile />  */}
        
        </>
    ) : (
      <></>
    )}
  </>
          )}
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
