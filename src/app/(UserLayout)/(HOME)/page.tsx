'use client';
import { Typography } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';


const defaultHome = () => {
  return (
    <PageContainer title="Home" description="this is Home">
      <DashboardCard title="Home">
        <Typography>This is a Home</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default defaultHome;

