import Modal from '@mui/material/Modal';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import { useState } from 'react';
import Link from 'next/link';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const CustomersTable = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let index = 0;

  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  return (
    <Card>

      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  No
                </TableCell>
                <TableCell>
                  Nama
                </TableCell>
                <TableCell>
                  Dibuat Pada
                </TableCell>
                <TableCell style={{ textAlign: 'center' }}>
                  Aksi
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer, i) => {
                index++;
                const isSelected = selected.includes(customer.id);
                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                  >
                    <TableCell>
                      {customer.no}
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {customer.nama}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {new Date().toDateString()}
                    </TableCell>
                    <TableCell>
                      <Stack
                        style={{ width: '100%' }}
                        alignItems="center"
                        direction="row"
                        justifyContent="center"
                        spacing={2}
                      >
                        <Link href={`/admin/data-paket/detail?id=${customer.id}`}>
                          <Button variant="contained" color='success'>Detail</Button>
                        </Link>
                        <Link href={`/admin/data-paket/tambah?action=edit&id=${customer.id}`}>
                          <Button variant="contained" color='info'>Edit</Button>
                        </Link>
                        <Button onClick={handleOpen} variant="contained" color='error'>Hapus</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography textAlign="center" id="modal-modal-title" variant="h6" component="h2">
            Yakin menghapus data paket ?
          </Typography>
          <Stack
            style={{ width: '100%', marginTop: '40px' }}
            alignItems="center"
            direction="row"
            justifyContent="center"
            spacing={2}
          >
            <Button onClick={handleClose} variant="contained" color='info'>Batal</Button>
            <Button onClick={handleClose} variant="contained" color='error'>Ya Hapus</Button>
          </Stack>
        </Box>
      </Modal>
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
