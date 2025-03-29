import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

import DashboardCard from '../shared/DashboardCard';
import { useEffect, useState } from 'react';

const AllUsers = () => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    fetch('/api/user/AllUsers')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.users) {
          setUserCount(data.users.length);
        }
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const optionscolumnchart: any = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  };

  const seriescolumnchart: any = [userCount];

  return (
    <DashboardCard title="All Users">
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Typography variant="h3" fontWeight="700">
          {userCount} Users
        </Typography>
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="donut"
          height={150} width={"100%"}
        />
      </Grid>
    </DashboardCard>
  );
};

export default AllUsers;
