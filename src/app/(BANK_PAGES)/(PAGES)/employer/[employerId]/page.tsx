'use client';
import { Typography } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import DashboardCard from '../../../components/shared/DashboardCard';


const SamplePage = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Trust account details">
        <Typography>coming soon...</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default SamplePage;

// page not in use 