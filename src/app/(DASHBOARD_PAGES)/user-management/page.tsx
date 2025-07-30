'use client';
import { useEffect, useState } from 'react';
import PageContainer from '../components/container/PageContainer';
import { useSession } from 'next-auth/react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Typography, CircularProgress, TablePagination, Dialog,
  DialogActions, DialogContent, DialogTitle, TableSortLabel, Checkbox, Stack,
  Grid
} from '@mui/material';
import DashboardCard from '../components/shared/DashboardCard';

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

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/user/TotalUsers')
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

  const handleBulkDelete = async () => {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    try {
      await Promise.all(
        ids.map(id =>
          fetch('/api/user/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          })
        )
      );
      setUsers(users.filter(user => !selectedIds.has(user.id)));
      setSelectedIds(new Set());
    } catch (error) {
      console.error('Error deleting selected users:', error);
      setError('Failed to delete selected users');
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 const handleCancel = () => {
    setOpenDialog(false);
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

  const getComparator = <Key extends keyof User>(order: Order, orderBy: Key) =>
    order === 'desc'
      ? (a: User, b: User) => (b[orderBy] < a[orderBy] ? -1 : 1)
      : (a: User, b: User) => (a[orderBy] < b[orderBy] ? -1 : 1);

  const sortedUsers = stableSort(users, getComparator(order, orderBy));
  const paginatedUsers = sortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <PageContainer title="Users" description="Manage user accounts">
      
      <Grid item xs={12}>
      <Typography variant="h4" 
        mt={3} mb={2}>
        User Management
      </Typography>
      </Grid>
  <DashboardCard>
          <>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleBulkDelete}
              disabled={selectedIds.size === 0}
            >
              Delete Selected
            </Button>
          </Stack>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'id'}
                      direction={orderBy === 'id' ? order : 'asc'}
        onClick={() => handleRequestSort('id')}
      >
        <b>ID</b>
      </TableSortLabel>
    </TableCell>
    <TableCell padding="checkbox">
      <b>Select</b>
    </TableCell>
{['name', 'role', 'email', 'created_at'].map((column) => (
      <TableCell key={column}>
        {['created_at', 'role'].includes(column) ? (
          <TableSortLabel
            active={orderBy === column}
            direction={orderBy === column ? order : 'asc'}
            onClick={() => handleRequestSort(column as keyof User)}
          >
            <b>{column.replace('_', ' ').toUpperCase()}</b>
          </TableSortLabel>
        ) : (
          <b>{column.replace('_', ' ').toUpperCase()}</b>
        )}
      </TableCell>
    ))}
  </TableRow>
</TableHead>
              <TableBody>
                {paginatedUsers.map(user => (
<TableRow
  key={user.id}
  sx={{ '&:hover': { backgroundColor: '#BDC3C7' } }}
  selected={selectedIds.has(user.id)}
>
  <TableCell>{user.id}</TableCell>
  <TableCell padding="checkbox">
    <Checkbox
      checked={selectedIds.has(user.id)}
      onChange={() => toggleSelect(user.id)}
    />
  </TableCell>
  <TableCell>{user.name}</TableCell>
  <TableCell
    sx={{
      color: user.role === 'admin' ? '#E74C3C' : '#3498DB',
      fontWeight: 'bold',
    }}
  >
    {user.role}
  </TableCell>
  <TableCell>{user.email}</TableCell>
  <TableCell>{new Date(user.created_at).toLocaleString()}</TableCell>
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
              '.MuiTablePagination-select': {
                backgroundColor: '#ECF0F1',
                color: '#2C3E50'
              },
              '.MuiTablePagination-actions': { color: '#2C3E50' }
            }}
          />
        </>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this user?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="error">Confirm</Button>
        </DialogActions>
      </Dialog>
      </>
      </DashboardCard>
    </PageContainer>
  );
};

export default UsersPage;
