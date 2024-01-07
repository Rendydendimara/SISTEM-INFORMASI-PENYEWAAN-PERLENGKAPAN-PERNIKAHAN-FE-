import { Box, Container, Stack, Typography } from '@mui/material';
import { includes, some } from 'lodash';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { ApiGetListPesanan } from 'src/api/pesanan';
import ToastMessage from 'src/components/atoms/ToastMessage';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { PesananTable } from 'src/sections/pesanan/pesanan-table';
import { applyPagination } from 'src/utils/apply-pagination';


const PesananPage = () => {
  const auth = useAuth();
  const [errMsg, setErrMsg] = useState({
    status: 'success',
    msg: '',
    isOpen: false
  })
  const handleCloseErrMsg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setErrMsg({
      status: 'success',
      msg: '',
      isOpen: false
    })
  };
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([])


  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );


  const getFiltered = () => {
    let dataReturn = data;
    // filter search
    if (search) {
      dataReturn = dataReturn.filter((dt) => {
        const haystack = [dt.nama.toLowerCase()];
        return some(haystack, (el) =>
          includes(el, search.toLowerCase())
        );
      });
    }
    return applyPagination(dataReturn, page, rowsPerPage);

  }

  const getAllData = async () => {
    const res = await ApiGetListPesanan(auth.user.id)
    if (res.status === 200) {
      let temp = []
      let index = 0;
      res?.data?.data?.forEach((dt) => {
        index += 1;
        temp.push({
          ...dt,
          no: index,
          id: dt.idPesanan,
          nama: dt.namaPesanan,
          waktu_penggunaan: dt.waktuPenggunaan,
          status: dt.statusPesanan
        });
      })
      setData(temp)
    } else {
      setErrMsg({
        status: 'error',
        msg: `Gagal get data paket. ${res.data.message}`,
        isOpen: true
      })
    }
  }

  useEffect(() => {
    getAllData()
  }, [])

  return (
    <>
      <Head>
        <title>
          Data Paket | Penyewaan Perlengkapan Pernikahan Di Nellysalon Waingapu
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Pesanan
                </Typography>
              </Stack>
            </Stack>
            <CustomersSearch
              onChange={onChangeSearch}
              value={search}
              placeholder="Cari nama pelanggan" />
            <PesananTable
              type="customer"
              count={data.length}
              items={getFiltered()}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
      <ToastMessage
        open={errMsg.isOpen}
        status={errMsg.status}
        message={errMsg.msg}
        onClose={handleCloseErrMsg}
      />

    </>
  );
};

PesananPage.getLayout = (page) => (
  <DashboardLayout type="customer">
    {page}
  </DashboardLayout>
);

export default PesananPage;
