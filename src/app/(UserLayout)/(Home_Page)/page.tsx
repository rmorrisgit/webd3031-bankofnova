import { Grid } from '@mui/material';
// import Link from 'next/link';
// import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import BankCard from "../components/blocks/BankCard";
import CTA from "../components/blocks/CTA";
import React from "react";
import MuiQuickstart from "../components/overview/MyCard";
import InfoPage from "../components/overview/MyCard2";
// Dynamically load the Footer component as a Client Component



const HomePage = () => {

  return (
    <>

<Grid container sx={{ padding: 0, mt: 6 }}>
  <Grid
    item
    xs={12}
    sm={12}
    md={6}
    lg={6}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      marginLeft: {
        xs: 0, // 0px on extra small screens
        md: 'auto',
        lg: 'auto',
      },
    }}
  >
    <CTA />
  </Grid>

  <Grid
    item
    xs={12}
    md={6}
    sx={{
      pointerEvents: 'none',   
      userSelect: 'none',      
    }}
  >
  </Grid>

  {/* <Grid
    item
    xs={12}
    sm={12}
    md={6}
    lg={6}
    sx={{
      pointerEvents: 'none',   
      userSelect: 'none',     
      display: 'flex',
      flexDirection: 'column',
      marginLeft: {
        xs: 0, 
        md: 'auto',
        lg: 'auto',
      },
    }}
  >
  </Grid>

  <Grid
    item
    xs={12}
    md={6}
    sx={{
      display: 'flex',
      justifyContent: 'center !important',
      alignItems: 'center',
    }}
  >
    <BankCard />
  </Grid> */}

</Grid>

{/* <Grid item xs={12} lg={8}>
            <MuiQuickstart />
            </Grid>
            
            <Grid item xs={12} lg={8}>
            <InfoPage />
            </Grid>  */}


    </>
  );
};

export default HomePage;
