import React, { useState } from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { Logo } from "react-mui-sidebar";

// Styled components
const FooterBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.main,
  padding: theme.spacing(8, 0),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
    pointerEvents: "none"
  }
}));


const Footersmall = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // const [email, setEmail] = useState("");

  // const handleSubscribe = () => {
  //   console.log("Subscribed:", email);
  //   setEmail("");
  // };

  return (
    <FooterBox>
          {/* Footer Bottom */}
          <Box pt={1} borderTop={1} m={2} borderColor="rgba(255,255,255,0.1)">
            <Typography variant="body2" color="rgba(255,255,255,0.7)" align="center">
              © {new Date().getFullYear()} Bank Of Nova. All rights reserved.
            </Typography>
          </Box>
      </FooterBox>
    );
    
};

export default Footersmall;
