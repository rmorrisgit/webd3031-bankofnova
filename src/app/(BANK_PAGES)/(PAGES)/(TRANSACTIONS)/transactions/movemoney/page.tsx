'use client';
import { Typography, Grid, Card, Stack, Box } from '@mui/material';
import PageContainer from '../../../../components/container/PageContainer';

const Transaction = () => {
  return (
    <PageContainer title="Sample Page" description="this is Sample page">
             

<Box sx={{ flexGrow: 1,  p: 2}}>
      <Grid container spacing={2}>
        {/* Left Column: Form */}
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: 500, p: 3, borderRadius: 2 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Move Money between accounts
            </Typography>
            <Typography variant="body1" color="textSecondary" mb={3} mt={2}>
            coming soon...
            </Typography>
</Box>
            </Grid>

</Grid>
</Box>
    </PageContainer>
  );
};

export default Transaction;

