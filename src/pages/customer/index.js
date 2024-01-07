import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { ApiGetListPaket } from 'src/api/paket';
import ToastMessage from 'src/components/atoms/ToastMessage';
import CardPaket from 'src/components/molecules/CardPaket';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const now = new Date();

const PelangganIndexPage = () => {
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

  const [dataPaket, setDataPaket] = useState([]);

  const getPaket = async () => {
    const res = await ApiGetListPaket()
    if (res.status === 200) {
      setDataPaket(res.data.data)
    } else {
      setErrMsg({
        status: 'error',
        msg: `Gagal get data paket. ${res.data.message}`,
        isOpen: true
      })
    }
  }

  useEffect(() => {
    getPaket()
  }, [])

  return (
    <>
      <Head>
        <title>
          Overview | Penyewaan Perlengkapan Pernikahan Di Nellysalon Waingapu
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
          <Grid
            container
            spacing={3}
          >
            {dataPaket.map((dt, i) => (
              <Grid
                key={i}
                xs={12}
                sm={6}
                lg={3}
              >
                <CardPaket data={dt} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      <ToastMessage
        open={errMsg.isOpen}
        status={errMsg.status}
        message={errMsg.msg}
        onClose={handleCloseErrMsg}
      />

    </>
  )

};

PelangganIndexPage.getLayout = (page) => (
  <DashboardLayout type="customer">
    {page}
  </DashboardLayout>
);

export default PelangganIndexPage;
