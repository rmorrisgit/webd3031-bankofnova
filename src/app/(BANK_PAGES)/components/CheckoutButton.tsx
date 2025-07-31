'use client';
import { useTheme } from "@mui/material";

export default function CheckoutButton() {
    const theme = useTheme();
  
  const handleClick = async () => {
    const res = await fetch('/api/stripe/checkout-session', {
      method: 'POST',
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Could not create Stripe session');
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        fontSize: '1rem',
        fontWeight: 'bold',
        borderRadius: '8px',
        cursor: 'pointer',
        width: '100%',
      }}
    >
      Subscribe for $16.99
    </button>
  );
}
