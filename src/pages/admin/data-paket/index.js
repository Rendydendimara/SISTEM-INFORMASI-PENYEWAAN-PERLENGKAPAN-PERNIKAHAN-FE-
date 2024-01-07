import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { includes, some } from 'lodash';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ApiGetListPaket } from 'src/api/paket';
import ToastMessage from 'src/components/atoms/ToastMessage';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { applyPagination } from 'src/utils/apply-pagination';

const Page = () => {
  const [data, setData] = useState([])
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('')

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
  }

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const returnData = () => {
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


  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const getAllData = async () => {
    const res = await ApiGetListPaket()
    if (res.status === 200) {
      let temp = []
      let index = 0;
      res?.data?.data?.forEach((dt) => {
        index += 1;
        temp.push({
          ...dt,
          no: index,
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
                  Paket
                </Typography>
              </Stack>
              <Link href="/admin/data-paket/tambah">
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Tambah
                </Button>
              </Link>
            </Stack>
            <CustomersSearch
              onChange={onChangeSearch}
              value={search}
              placeholder="Cari paket"
            />
            <CustomersTable
              count={data.length}
              items={returnData()}
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

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
