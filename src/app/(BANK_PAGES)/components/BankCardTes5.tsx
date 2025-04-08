'use client';
import React from 'react';
import { Container, Box, Grid, Typography, Stack, Button } from '@mui/material';
import Link from 'next/link';
import { useMediaQuery, useTheme } from "@mui/material";

const BankCardTest5 = () => {
    const theme = useTheme();
    const lgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const xlUp = useMediaQuery(theme.breakpoints.up("xl"));
  return (
    <Grid
      container
      sx={{
        borderRadius: '16px',
        // backgroundColor: 'lawngreen',
        marginBottom: '16px',
        marginTop: '100px',
        overflow: 'hidden', // optional: to keep border radius consistent
      }}
    >
      {/* First column */}
      <Grid
        item
        // marginRight={"24px"}
        marginLeft={xlUp ? '42px' : '0px'}
        xs={12}
        md={6}
        sx={{
        backgroundColor: 'white',
          border: '2px solid rgb(0, 255, 76)',
          height: '250px',
          maxWidth: xlUp ? '624px !important' : 'auto' ,
          // backgroundColor: 'info.dark',
          borderRadius: '16px', 
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Stack sx={{ width: '100%' }}>
          <Box
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
   

          </Box>
        </Stack>
      </Grid>

      {/* Second column */}
     
    </Grid>
  );
};

export default BankCardTest5;
