'use client';
import { Typography } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import ProductPerformance from "../../components/overview/TransactionPageTable";


const Transaction = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
      <DashboardCard title="Sample Page">
        <ProductPerformance />
        </DashboardCard>
    </PageContainer>
  );
};

export default Transaction;

