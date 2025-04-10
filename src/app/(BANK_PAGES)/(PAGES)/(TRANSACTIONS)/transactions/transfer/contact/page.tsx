'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, TextField, Button } from '@mui/material';
import PageContainer from '../../../../../components/container/PageContainer';
import DashboardCard from '../../../../../components/shared/DashboardCard';

const AddContactPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillEmail = searchParams.get('email') || ''; // Optional: prefill if email param exists

  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      email: prefillEmail,
      nickname: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/user/addContact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          nickname: data.nickname,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add contact');
      }

      alert('Contact added successfully!');
      router.push('/transactions/transfer');
    } catch (error) {
      console.error(error);
      alert('Error adding contact. Please try again.');
    }
  };

  return (
    <PageContainer title="Add Contact" description="Add a new contact to your list">
      <DashboardCard title="Add New Contact">
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Please enter a valid email address',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Contact Email"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
            )}
          />

          {/* Nickname Field */}
          <Controller
            name="nickname"
            control={control}
            rules={{
              required: 'Nickname is required',
              minLength: {
                value: 2,
                message: 'Nickname should be at least 2 characters',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Nickname"
                margin="normal"
                error={!!errors.nickname}
                helperText={errors.nickname ? errors.nickname.message : ''}
              />
            )}
          />

          {/* Buttons */}
          <Box mt={2} display="flex" gap={2}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Add Contact
            </Button>
          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default AddContactPage;
