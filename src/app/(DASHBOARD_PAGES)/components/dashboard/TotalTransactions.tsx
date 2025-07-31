'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';
import DashboardCard from '../shared/DashboardCard';

const TotalTransactions = () => {
  const theme = useTheme();
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalTransactions = async () => {
      try {
        const res = await fetch('/api/user/totalTransactions');
        const data = await res.json();
        if (data.success) {
          setTotal(data.total);
        }
      } catch (err) {
        console.error('Failed to fetch total transactions:', err);
      }
    };

    fetchTotalTransactions();
  }, []);

  return (
    <DashboardCard title="Total User Transactions">
      <>
      <Typography variant="h6" fontWeight="700" mt="-20px">
  {total !== null ? `${total.toLocaleString()} transactions` : 'Loading...'}
</Typography>


      <Stack direction="row" spacing={1} my={1} alignItems="center">
        <Typography variant="subtitle2" fontWeight="600">
          This includes all completed user transactions
        </Typography>
      </Stack>
      </>
    </DashboardCard>
  );
};

export default TotalTransactions;
