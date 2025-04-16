import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image'; // Add this at the top

interface BankCardProps {
  name: string;
}

const BankCard = ({ name }: BankCardProps) => {
  return (
    <Box
      sx={{
        width: '300px',
        height: '180px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #5D87FF,rgb(100, 100, 100))',
        padding: '16px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Card Top */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: '500' }}>
          Bank of Nova
        </Typography>
      </Box>

      {/* Card Middle */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography variant="subtitle1">**** **** **** 1234</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ fontSize: '12px' }}>
            VALID THRU
          </Typography>
          <Typography variant="subtitle1" sx={{ fontSize: '14px' }}>
            12/28
          </Typography>
        </Box>
      </Box>

      {/* Card Bottom */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
    <Typography variant="subtitle1" sx={{ fontSize: '16px' }}>
  {(name || "Your Name").toUpperCase()}
</Typography>

        <Box
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '12px',
              color: '#0077b6',
            }}
          >
                  {/* Logo Image */}
        <Box
          sx={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >

<Image
  src="/images/logos/goodbanklogo.png"
  alt="Logo"
  width={55}
  height={55}
  style={{ objectFit: 'contain' }}
/>
        </Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BankCard;
