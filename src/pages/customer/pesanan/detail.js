import { Box, Button, Card, CardContent, CardHeader, Container, MenuItem, Select, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Link from 'next/link';
import { toFormatPrice } from 'src/pages/admin/data-paket/tambah';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ApiGetDetailPesanan } from 'src/api/pesanan';
import ToastMessage from 'src/components/atoms/ToastMessage';
import moment from 'moment';
import { SeverityPill } from 'src/components/severity-pill';
import { statusMap, statusMapToTitle } from 'src/sections/overview/overview-latest-orders';

const DetailPesananPage = () => {
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

  const searchParams = useSearchParams()
  const [detailPesanan, setDetailPesanan] = useState({
    waktuPemesanan: "",
    namaPaket: "",
    idPesanan: 0,
    idUser: 0,
    hargaPesanan: 0,
    statusPesanan: "",
    waktuPenggunaan: "",
    waktuPengembalian: "",
    namaPesanan: "",
    alamatPesanan: "",
    nomorTeleponPesanan: 0,
    idPaket: 0
  })

  const getPesanan = async (id) => {
    const res = await ApiGetDetailPesanan(id);
    if (res.status === 200) {
      setDetailPesanan(res.data.data)
    } else {
      setErrMsg({
        status: 'error',
        msg: `Gagal get data paket. ${res.data.message}`,
        isOpen: true
      })

    }
  }


  useEffect(() => {
    const id = searchParams.get('id');
    getPesanan(id)
  }, [searchParams]);

  return (
    <>
      <Head>
        <title>
          Pesanan | Penyewaan Perlengkapan Pernikahan Di Nellysalon Waingapu
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Detail Pesanan
              </Typography>
            </div>
            <div>
              <Card>
                <CardHeader
                  subheader="Informasi detail pesanan"
                  title="Informasi pesanan"
                />
                <CardContent sx={{ pt: 0 }}>
                  <Box>
                    <Typography gutterBottom
                    >Pelanggan: {detailPesanan.namaPesanan}</Typography>
                    <Box display="flex" gap="5px">
                      <Typography gutterBottom
                      >Paket: {detailPesanan.namaPaket}</Typography>
                      <Link href={`/customer/paket/${detailPesanan.idPaket}`}>
                        <Typography gutterBottom
                        >(cek detail)</Typography>
                      </Link>
                    </Box>

                    <Typography gutterBottom
                    >Harga: Rp.{toFormatPrice(detailPesanan.hargaPesanan, 'IDR')}</Typography>
                    <Typography gutterBottom
                    >Status Pesanan:
                      <SeverityPill color={statusMap[detailPesanan.statusPesanan]}>
                        {statusMapToTitle[detailPesanan.statusPesanan]}
                      </SeverityPill>
                    </Typography>
                    <Typography gutterBottom
                    > Waktu penggunaan: {moment(detailPesanan.waktuPenggunaan).format('LL')}</Typography>
                    <Typography gutterBottom
                    > Waktu pengembalian: {moment(detailPesanan.waktuPengembalian).format('LL')}</Typography>
                    <Typography gutterBottom
                    > Waktu pemesanan: {moment(detailPesanan.waktuPemesanan).format('LL')}</Typography>
                    {/* <Box display="flex" alignItems="flex-start" gap="5px">
                      <Typography gutterBottom
                      > Ganti status pesanan:</Typography>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={"Akan digunakan"}
                        label="Status pesanan"
                        name="status"
                        size='small'
                      // onChange={handleChange}
                      >
                        <MenuItem value={"-"}>-</MenuItem>
                        <MenuItem value={"Akan digunakan"}>Batal Pesanan</MenuItem>
                      </Select>
                    </Box> */}
                  </Box>
                </CardContent>
              </Card>
            </div>
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
  )
}


DetailPesananPage.getLayout = (page) => (
  <DashboardLayout type="customer">
    {page}
  </DashboardLayout>
);

export default DetailPesananPage;
