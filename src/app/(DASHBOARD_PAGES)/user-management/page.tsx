'use client';
import { useEffect, useState } from 'react';
import PageContainer from '../components/container/PageContainer';
import { useSession } from 'next-auth/react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, CircularProgress, TablePagination, Dialog,
  DialogActions, DialogContent, DialogTitle, TableSortLabel
} from '@mui/material';

interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
  role: string;
}

type Order = 'asc' | 'desc';

const UsersPage = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof User>('created_at');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/user/AllUsers')
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

  const handleDelete = async () => {
    if (!selectedUserId) return;

    try {
      const res = await fetch('/api/user/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedUserId }),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setUsers(users.filter(user => user.id !== selectedUserId));
      } else {
        setError(result.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }

    setOpenDialog(false);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property: keyof User) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const stableSort = <T,>(array: T[], comparator: (a: T, b: T) => number): T[] => {
    const stabilized = array.map((el, index) => [el, index] as [T, number]);
    stabilized.sort((a, b) => {
      const orderResult = comparator(a[0], b[0]);
      return orderResult !== 0 ? orderResult : a[1] - b[1];
    });
    return stabilized.map(el => el[0]);
  };

  const getComparator = <Key extends keyof User>(
    order: Order,
    orderBy: Key
  ): ((a: User, b: User) => number) => {
    return order === 'desc'
      ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0)
      : (a, b) => (a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0);
  };

  const sortedUsers = stableSort(users, getComparator(order, orderBy));
  const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <PageContainer title="Users" description="Manage user accounts">
      <Typography variant="h5" gutterBottom sx={{ color: '#333' }}>
        Manage Users
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <TableContainer component={Paper} sx={{
            maxWidth: '100%', margin: 'auto', boxShadow: 3, overflowX: 'auto', backgroundColor: '#fafafa'
          }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead sx={{ backgroundColor: '#2C3E50' }}>
                <TableRow>
                  {['id', 'name', 'email', 'created_at', 'role'].map((column) => (
                    <TableCell key={column} sx={{ color: '#ECF0F1' }}>
                      {(column === 'id' || column === 'created_at' || column === 'role') ? (
                        <TableSortLabel
                          active={orderBy === column}
                          direction={orderBy === column ? order : 'asc'}
                          onClick={() => handleRequestSort(column as keyof User)}
                          sx={{ color: '#ECF0F1', '&.Mui-active': { color: '#F1C40F' } }}
                        >
                          <b>{column.replace('_', ' ').toUpperCase()}</b>
                        </TableSortLabel>
                      ) : (
                        <b>{column.replace('_', ' ').toUpperCase()}</b>
                      )}
                    </TableCell>
                  ))}
                  <TableCell sx={{ color: '#ECF0F1' }}><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map(user => (
                  <TableRow key={user.id} sx={{ '&:hover': { backgroundColor: '#BDC3C7' } }}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
                    <TableCell sx={{
                      color: user.role === 'admin' ? '#E74C3C' : '#3498DB',
                      fontWeight: 'bold'
                    }}>
                      {user.role}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteClick(user.id)}
                        sx={{ backgroundColor: '#E74C3C', '&:hover': { backgroundColor: '#C0392B' } }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              '.MuiTablePagination-select': { backgroundColor: '#ECF0F1', color: '#2C3E50' },
              '.MuiTablePagination-actions': { color: '#2C3E50' }
            }}
          />
        </>
      )}

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="error">Confirm</Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default UsersPage;
