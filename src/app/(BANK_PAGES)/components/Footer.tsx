import React, { useState } from "react";
import { Box, Container, Grid, Typography, TextField, Button, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/system";
import { Logo } from "react-mui-sidebar";

// Styled components
const FooterBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  position: "relative",
  background: theme.palette.primary.dark,
  color: "#ffffffff",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    pointerEvents: "none"
  }
}));




const Footer = () => {
  return (
    <FooterBox>
<Container
  maxWidth="lg"
  sx={{
    paddingLeft: '0 !important', // Disable padding-left
    paddingRight: '0 !important', // Disable padding-right
    marginLeft: {
      xs: '16px', // 16px margin for mobile devices (default)
      lg: 'auto', // 32px margin for large screens (1200px and above)
    },
    marginRight: {
      xs: '16px', // 16px margin for mobile devices (default)
      lg: 'auto', // 32px margin for large screens (1200px and above)
    },
  }}
>
      <Grid 
        container 
        spacing={{ xs: 4, md: 0 }} // Adds spacing on small screens, none on medium and above
      >
        {/* Bank primary */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom >
            Bank of Nova
          </Typography>
          <Typography variant="h6" pr={4}  sx={{ maxWidth: 300 }}>
            Pioneering the future of Banking
          </Typography>
        </Grid>
    
  
{/* Contact primary */}
<Grid item xs={12} md={6}>
  <Typography variant="h6" gutterBottom>
    About
  </Typography>
  <Typography variant="body2" pr={4}>
    Halifax, Nova Scotia, Canada
    <br />
    <a
      href="https://github.com/NSCC-ITC-Winter2025-WEBD3031-700-MCa/webd3031-project-bankofnova"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'rgba(255,255,255,0.7)',  textDecoration: 'underline' }}
    >
      GitHub Repository
    </a>
  </Typography>
</Grid>
  
 
     
          </Grid>

        </Container>
            
          {/* Footer Bottom */}
          <Box mt={8} pt={3} borderTop={1} borderColor="rgba(255,255,255,0.1)">
            <Typography variant="body2" align="center">
              © {new Date().getFullYear()} Bank Of Nova. All rights reserved.
            </Typography>
          </Box>
      </FooterBox>
    );
    
};

export default Footer;
