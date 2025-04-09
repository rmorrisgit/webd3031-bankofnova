'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import dynamic from 'next/dynamic';

// Dynamically import components with SSR disabled
const SalesOverview = dynamic(() => import('../components/dashboard/UserRegistration'), { ssr: false });
const YearlyBreakup = dynamic(() => import('../components/dashboard/AllUsers'), { ssr: false });

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
