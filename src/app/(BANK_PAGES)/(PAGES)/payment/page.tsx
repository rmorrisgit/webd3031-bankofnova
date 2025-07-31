'use client';
import CheckoutButton from '../../components/CheckoutButton';
import { CheckCircle } from '@mui/icons-material';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';

export default function PricingPage() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      // bgcolor="#f9f9f9"
      minHeight="100vh"
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: '16px',
          p: 6,
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h1" sx={{ color: '#000000', mb: 1 }}>
          Bank of Nova Premium
        </Typography>

        <Typography variant="body1" sx={{ color: '#444', mb: 3 , mt: 3}}>
          Unlock credit card and more features.
        </Typography>

        <Typography variant="h3" component="div" sx={{ color: '#000000', fontWeight: 700, mb: 1 }}>
          $16.99/mo <Typography component="span" variant="body2" fontWeight={400}>*</Typography>
        </Typography>

        <Typography variant="caption" sx={{ color: '#888', display: 'block', mb: 3 }}>
          *with the Value Program
        </Typography>

        <List sx={{ textAlign: 'left', mb: 4 }}>
          {[
            'Low interest credit card',
            'Borrow money up to a set credit limit',
            'Premium expense tracking',
          ].map((feature, index) => (
            <ListItem key={index} disableGutters sx={{ alignItems: 'center' }}>
              <ListItemIcon sx={{ minWidth: '32px' }}>
                <CheckCircle sx={{ color: '#4caf50' }} />
              </ListItemIcon>
              <ListItemText primary={feature} primaryTypographyProps={{ sx: { color: '#333' } }} />
            </ListItem>
          ))}
        </List>

        <CheckoutButton />
      </Paper>
    </Box>
  );
}
