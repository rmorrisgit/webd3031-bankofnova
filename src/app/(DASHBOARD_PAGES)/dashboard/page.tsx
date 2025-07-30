'use client'
import { Grid, Box, Typography } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import dynamic from 'next/dynamic';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import ProductPerformance from '../components/dashboard/ProductPerformance';
import TotalTransactions from '../components/dashboard/TotalTransactions';
// import Blog from '../components/dashboard/Blog';
// Dynamically import components with SSR disabled
const SalesOverview = dynamic(() => import('../components/dashboard/UserRegistration'), { ssr: false });
const TotalUsers = dynamic(() => import('../components/dashboard/TotalUsers'), { ssr: false });

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Grid item xs={12}>
      {/* <Typography variant="h4" 
        mt={3} mb={2}
      >Dashboard
      </Typography> */}
      </Grid> 
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TotalUsers />
              </Grid>
              <Grid item xs={12}>
                <TotalTransactions />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
          <RecentTransactions />
           </Grid>
           <Grid item xs={12} lg={8}>
             <ProductPerformance />
           </Grid>
           <Grid item xs={12}>
              {/* <Blog />  */}
           </Grid> 
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
