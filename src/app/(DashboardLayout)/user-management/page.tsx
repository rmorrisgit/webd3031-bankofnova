'use client';
import { useEffect, useState } from 'react';
import PageContainer from '../components/container/PageContainer';
import DashboardCard from '../components/shared/DashboardCard';
import { useSession } from 'next-auth/react';
import { Box } from '@mui/material';
interface BankAccount {
  id: string;
  account_type: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  bankAccounts: BankAccount[];
}

const UsersPage = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Fetch users
  useEffect(() => {
    fetch('/api/user/contacts')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsers(data.users);
        } else {
          setError(data.message || 'Failed to fetch users');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
        setLoading(false);
      });
  }, []);

  // Delete user
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      const res = await fetch('/api/user/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setUsers(users.filter(user => user.id !== id));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  return (
    <PageContainer title="Users" description="Manage user accounts">
        <Box>
        {loading && <p>Loading users...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Bank Accounts</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="text-center">
                <td className="border p-2">{user.id}</td>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  {user.bankAccounts.length > 0 ? (
                    <ul>
                      {user.bankAccounts.map(account => (
                        <li key={account.id}>{account.account_type}</li>
                      ))}
                    </ul>
                  ) : (
                    'No accounts'
                  )}
                </td>
                <td className="border p-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </Box>
    </PageContainer>
  );
};

export default UsersPage;
