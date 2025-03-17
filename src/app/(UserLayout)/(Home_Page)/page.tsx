'use client';
import { Typography } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
// import Transactions from "../components/overview/TransactionTable";


const defaultHome = () => {
  return (
    <PageContainer title="Home" description="this is Home">
      <DashboardCard title="Home">
        {/* <Transactions /> */}
      </DashboardCard>
    </PageContainer>
  );
};

export default defaultHome;

