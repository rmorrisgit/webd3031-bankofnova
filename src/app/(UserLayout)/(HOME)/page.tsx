'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
// components


const defaultHome = () => {
  return (
    <PageContainer title="HOME" description="this is HOME">
     <Box>
     <Grid item xs={12} lg={8}>


     </Grid>
     </Box>
    </PageContainer>
  )
}

export default defaultHome;
