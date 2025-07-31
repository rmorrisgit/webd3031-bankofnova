'use client';

import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const TestGrid1 = () => {
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const xlUp = useMediaQuery(theme.breakpoints.up("xl"));

  return (
        <Grid
          container
          sx={{
            backgroundColor: theme.palette.error.light,
          }}
        >
        {/* Two columns here */}
        <Grid container >
          <Grid item xs={12} md={8}>
            <Typography variant="h6" fontWeight="medium">
              Left Column
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Left Item 1" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Left Item 2" />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={4} sx={{ background: 'lightgray' }}>
            <Typography variant="h6" fontWeight="medium">
              Right Column
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Right Item 1" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Right Item 2" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Grid>
  );
};

export default TestGrid1;
