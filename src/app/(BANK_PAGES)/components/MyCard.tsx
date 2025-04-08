import React from "react";
import { Container, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Button, Grid } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const MuiQuickstart = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Sidebar Navigation */}
        <Grid item xs={12} md={3}>
          <Box sx={{ position: "sticky", top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <List>
              {["Introduction", "Getting Started", "Demos", "Documentation"].map((text) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={9}>
          {/* Introduction */}
          <Typography variant="h4" gutterBottom>
            Introduction
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet consectetur adipint 
          </Typography>
          <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet consectetur adipint 
          </Typography>
          <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet consectetur adipint 
          </Typography>

          {/* Key Features */}
          <Typography variant="h5" gutterBottom>
            Key Features
          </Typography>
          <List>
            {["Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit.",]
            .map((feature) => (
              <ListItem key={feature}>
                <ListItemIcon>
                  <CheckBoxIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={feature} />
              </ListItem>
            ))}
          </List>

          {/* Getting Started */}
          <Typography variant="h5" gutterBottom>
            Getting Started
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button variant="contained" color="primary">Option 1:  Lorem ipsum dolor sit amet c</Button>
            <Button variant="contained" color="secondary">Option 2: Lorem ipsum dolor sit a</Button>
          </Box>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet consectetur adipint cum itaque..
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MuiQuickstart;