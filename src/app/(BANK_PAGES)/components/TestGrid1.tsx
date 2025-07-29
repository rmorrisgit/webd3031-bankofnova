'use client';

import { Typography, Box, List, ListItem, ListItemIcon, ListItemText, Grid, useTheme, useMediaQuery } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const TestGrid1 = () => {
  const theme = useTheme();
  // add lg and md 
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));

  return (
    <Box
      sx={{
        marginTop: "20px",
        height: "auto",
        py: 6,
        px: 4,
        maxWidth: xlUp ? '94% !important' : '100% !important',
        marginLeft: 'auto',
        marginRight: 'auto',
        // backgroundColor: theme.palette.primary.light,
      }}
    >
      
      <Box maxWidth="700px" bgcolor={theme.palette.primary.light} p={4} borderRadius="16px" boxShadow={3}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome to Bank of Nova
        </Typography>

        <Typography variant="body1" color={theme.palette.grey[200]} sx={{ mb: 3 }}>
        YOOOOO
        </Typography>

        {/* <List>
          <ListItem disableGutters>
            <ListItemIcon><CheckBoxIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Open and manage accounts" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon><CheckBoxIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Send and receive transfers" />
          </ListItem>
          <ListItem disableGutters>
            <ListItemIcon><CheckBoxIcon color="primary" /></ListItemIcon>
            <ListItemText primary="View transaction history" />
          </ListItem>
        </List> */}
      </Box>
    </Box>
  );
};

export default TestGrid1;
