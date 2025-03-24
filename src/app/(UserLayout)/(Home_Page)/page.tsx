'use client';
import { Box, Typography, Button, Grid, Stack } from '@mui/material';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Shadow = () => {
  const router = useRouter(); // Initialize the router

  const handleGetStarted = () => {
    router.push('/register'); // Navigate to the /register page when the button is clicked
  };

  return (
    <>
      <Grid container sx={{ padding: 0, mt: 2 }}>
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
          <DashboardCard elevation={0} borderRadius={0}>
            <Stack>
              <Typography variant="h2" fontWeight="600" mb="20px">
                Open a Bank of Nova Chequing Account
              </Typography>
              <Box sx={{ mt: 'auto', textAlign: 'left', pt: 1 }}>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ ps: 2, pe: 2, borderRadius: 0 }}
                  disableElevation
                  onClick={handleGetStarted} // Add the onClick event handler
                >
                  Get started
                </Button>
              </Box>
            </Stack>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </>
  );
};

export default Shadow;
