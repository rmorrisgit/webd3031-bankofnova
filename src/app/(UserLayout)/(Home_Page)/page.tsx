'use client';
import { Box, Typography, Button, Grid, Stack,  useTheme,
  useMediaQuery } from '@mui/material';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';

const Shadow = () => {
  const router = useRouter(); // Initialize the router
  const theme = useTheme();

  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md")); // Detect small screens

  const handleGetStarted = () => {
    router.push('/register'); // Navigate to the /register page when the button is clicked
  };

  return (
    <>
      <Grid container sx={{ padding: 0, mt: 6}}>
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
            <Box
                sx={{
                  textAlign: isMediumScreen ? 'center' : 'left', // Dynamically set text alignment
                  pt: 3,
                }}
              >
              <Typography variant="h2" fontWeight="600" mb="20px">
                Open a Bank of Nova Chequing Account
              </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ ps: 2, 
                    pe: 2, 
                    borderRadius: '10px' ,
                    marginTop: '6px',
                    marginBottom:  '4px',
                    height: '44px',
                  }}
                  disableElevation
                  onClick={handleGetStarted} // Add the onClick event handler
                >
                  <Typography variant="h6">
                    Get Started
                  </Typography>
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
