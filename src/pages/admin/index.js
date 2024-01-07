import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useEffect, useState } from 'react';
import { ApiGetListUser } from 'src/api/auth';
import { ApiGetListPaket } from 'src/api/paket';
import { ApiGetListPesanan } from 'src/api/pesanan';
import ToastMessage from 'src/components/atoms/ToastMessage';
import moment from 'moment';


const Page = () => {
  const [dataUser, setDataUser] = useState([])
  const [dataPaket, setDataPaket] = useState([])
  const [dataPesanan, setDataPesanan] = useState([])
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

  const getData = async () => {
    const res = await Promise.all([ApiGetListUser(), ApiGetListPaket(), ApiGetListPesanan()])
    if (res[0].status === 200) {
      setDataUser(res[0].data.data)
    } else {
      setErrMsg({
        status: 'error',
        msg: `Error. ${res[0].data.message}`,
        isOpen: true
      })
    }
    if (res[1].status === 200) {
      setDataPaket(res[1].data.data)
    } else {
      setErrMsg({
        status: 'error',
        msg: `Error. ${res[1].data.message}`,
        isOpen: true
      })
    }
    if (res[2].status === 200) {
      setDataPesanan(res[2].data.data)
    } else {
      setErrMsg({
        status: 'error',
        msg: `Error. ${res[2].data.message}`,
        isOpen: true
      })
    }
  }

  const getLastestProduct = () => {
    let data = dataPaket.slice(0, 3).map((dt) => {
      let imgs = dt?.gambar?.split(",");
      const now = moment()
      const days = now.diff(dt.created_at, "days")

      return {
        id: dt.id,
        image: imgs[0],
        name: dt.nama,
        updatedAt: days
      }
    })
    return data
  }


  const getLastestPesanan = () => {
    let data = dataPesanan.slice(0, 4).map((dt) => {
      return {

        id: dt.idPesanan,
        ref: dt.idPesanan,
        customer: {
          name: dt.namaPesanan
        },
        createdAt: new Date(dt.waktuPemesanan).getTime(),
        status: dt.statusPesanan
      }
    })
    return data
  }

  useEffect(() => {
    getData()
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
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewBudget
                positive
                sx={{ height: '100%' }}
                value={dataPaket.length}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalCustomers
                // difference={16}
                // positive={false}
                sx={{ height: '100%' }}
                value={dataUser.length}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalProfit
                sx={{ height: '100%' }}
                value={dataPesanan.length}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewLatestProducts
                products={getLastestProduct()}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={8}
            >

              <OverviewLatestOrders
                orders={getLastestPesanan()}
                sx={{ height: '100%' }}
              />
            </Grid>
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

Page.getLayout = (page) => (
  <DashboardLayout type="admin">
    {page}
  </DashboardLayout>
);

export default Page;
