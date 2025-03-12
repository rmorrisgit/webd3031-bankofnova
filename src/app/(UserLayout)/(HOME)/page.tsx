'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '../components/container/PageContainer';
// components
import MonthlyEarnings from '../components/dashboard/MonthlyEarnings';


const defaultHome = () => {
  return (
    <PageContainer title="HOME" description="this is HOME">
     <Box>
     <Grid item xs={12} lg={8}>
     <MonthlyEarnings title="Chequings" balance={5142}/>
     <MonthlyEarnings title="Savings" balance={40321}/>

     </Grid>
     </Box>
    </PageContainer>
  )
}

export default defaultHome;
