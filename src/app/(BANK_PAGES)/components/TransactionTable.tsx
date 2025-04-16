import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  TablePagination
} from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchTransactions } from '../../api/user';

interface ProductPerformanceProps {
  accountType: 'chequing' | 'savings';
}

const TransactionTable = ({ accountType }: ProductPerformanceProps) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const response = await fetchTransactions(accountType);
        setTransactions(response);
      } catch (error) {
        setError('Failed to fetch transactions.');
      }
    };

    getTransactions();
  }, [accountType]);

  const getDescription = (transaction: any) => {
    if (transaction.direction === 'sent') {
      return `To account: ${transaction.receiver_name || 'N/A'}`;
    }
    if (transaction.direction === 'received') {
      return `From account: ${transaction.sender_name || 'N/A'}`;
    }
    if (transaction.sender_name) {
      return `Deposit from ${transaction.sender_name}`;
    }
    return transaction.transaction_type || 'Transaction';
  };

  const getTransactionTypeLabel = (transaction: any) => {
    if (transaction.transaction_type === 'deposit') return 'Deposit';
    if (transaction.transaction_type === 'transfer') return 'Transfer';
    return transaction.transaction_type || 'Transaction';
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedTransactions = transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card elevation={0}>
      <Box sx={{ overflow: 'auto' }}>
        <Table aria-label="transaction table" sx={{ whiteSpace: 'nowrap', mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Date</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Description</Typography></TableCell>
              <TableCell><Typography variant="subtitle2" fontWeight={600}>Account Type</Typography></TableCell>
              <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Amount</Typography></TableCell>
              <TableCell align="right"><Typography variant="subtitle2" fontWeight={600}>Balance</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography align="center" color="textSecondary">No transactions available.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id} sx={{ borderBottom: (theme) => `2px solid ${theme.palette.divider}` }}>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {new Date(transaction.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" flexDirection="column">
                      <Typography variant="caption" color="textSecondary">{getTransactionTypeLabel(transaction)}</Typography>
                      <Typography variant="subtitle2" fontWeight={600}>{getDescription(transaction)}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={400}>
                      {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" sx={{ color: transaction.direction === 'sent' ? 'error.main' : 'success.main' }}>
                      {transaction.direction === 'sent' ? '-' : '+'}${transaction.amount}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" fontWeight={400}>${transaction.balance}</Typography>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* ✅ Pagination Controls */}
        <TablePagination
  component="div"
  count={transactions.length}
  page={page}
  onPageChange={handleChangePage}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  rowsPerPageOptions={[]} // ✅ Hides the dropdown options
  labelRowsPerPage=""     // ✅ Hides the "Rows per page" text
  sx={{
    '.MuiTablePagination-selectLabel, .MuiTablePagination-select': {
      display: 'none',
    },
  }}
/>
      </Box>
    </Card>
  );
};

export default TransactionTable;
