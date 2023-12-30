import { Box, Card, CardContent, CardHeader, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { toFormatPrice } from './tambah';

const slides = [{ src: 'https://placehold.co/600x400' }, { src: 'https://placehold.co/600x600' }, { src: 'https://placehold.co/600x700' }]


const DetailPaketPage = () => {
  const [index, setIndex] = useState(-1);
  return (

    <>
      <Head>
        <title>
          Account | Penyewaan Perlengkapan Pernikahan Di Nellysalon Waingapu
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
                Detail Paket
              </Typography>
            </div>
            <div>
              <Card>
                <CardHeader
                  subheader="Informasi detail paket"
                  title="Informasi paket"
                />
                <CardContent sx={{ pt: 0 }}>
                  <Box>
                    <Typography gutterBottom
                    >Nama: XXX</Typography>
                    <Typography gutterBottom
                    >Harga: {toFormatPrice(10000, 'IDR')}</Typography>
                    <Typography gutterBottom
                    >Status: XXX</Typography>
                    <Typography gutterBottom
                    >Make Up: XXX</Typography>
                    <Typography gutterBottom
                    >Gaun Wanita: XXX</Typography>
                    <Typography gutterBottom
                    >Kemeja Pria: XXX</Typography>
                    <Typography gutterBottom
                    >Dekor Kamar Pengantin: XXX</Typography>
                    <Typography gutterBottom
                    >Dekor Panggung: XXX</Typography>
                    <Typography gutterBottom
                    >Meja dan Kursi Akad: XXX</Typography>
                    <Typography gutterBottom
                    >Tenda Terima Tamu: XXX</Typography>
                    <Typography gutterBottom
                    >Meja Terima Tamu: XXX</Typography>
                    <Box display="flex" alignItems="flex-start" gap="10px">
                      {slides.map((url, i) => (
                        <img
                          key={i}
                          src={url.src}
                          style={{
                            width: '165px',
                            height: '210px',
                            objectFit: 'contain',
                            objectPosition: 'center',
                            borderRadius: '8px',

                          }}
                          onClick={() => setIndex(i)}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </div>
          </Stack>
        </Container>
        <Lightbox
          index={index}
          slides={slides}
          open={index >= 0}
          close={() => setIndex(-1)}
        />
      </Box>
    </>
  )
};

DetailPaketPage.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default DetailPaketPage;
