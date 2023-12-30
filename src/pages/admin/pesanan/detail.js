import { Box, Card, CardContent, CardHeader, Container, MenuItem, Select, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { toFormatPrice } from '../data-paket/tambah';
import Link from 'next/link';

const DetailPesananPage = () => (
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
                  >Pelanggan: XXX</Typography>
                  <Box display="flex" gap="5px">
                    <Typography gutterBottom
                    >Paket: VVIP</Typography>
                    <Link href={`/admin/data-paket/detail?id=${'123'}`}>
                      <Typography gutterBottom
                      >(cek detail)</Typography>
                    </Link>
                  </Box>

                  <Typography gutterBottom
                  >Harga: Rp.{toFormatPrice(10000, 'IDR')}</Typography>
                  <Typography gutterBottom
                  >Status Pesanan: (Akan digunakan, Sedang digunakan, Selesai, Batal)</Typography>
                  <Typography gutterBottom
                  > Waktu penggunaan: XXX</Typography>
                  <Typography gutterBottom
                  > Waktu pengembalian: XXX</Typography>
                  <Typography gutterBottom
                  > Waktu pemesanan: XXX</Typography>
                  <Box display="flex" alignItems="flex-start" gap="5px">
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
                      <MenuItem value={"Akan digunakan"}>Akan digunakan</MenuItem>
                      <MenuItem value={"Sedang digunakan"}>Sedang digunakan</MenuItem>
                      <MenuItem value={"Selesai"}>Selesai</MenuItem>
                    </Select>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
);

DetailPesananPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default DetailPesananPage;
