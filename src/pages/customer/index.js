import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import Head from 'next/head';
import { useState } from 'react';
import CardPaket from 'src/components/molecules/CardPaket';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const now = new Date();

const PelangganIndexPage = () => {
  const [dataPaket, setDataPaket] = useState([
    {
      nama: 'Paket A',
      harga: 1000000,
      id: 1,
      deskripsi: `Lizards are a widespread group of squamate reptiles, with over 6,000
      species, ranging across all continents except Antarctica. Lizards are a widespread group of squamate reptiles, with over 6,000
      species, ranging across all continents except Antarctica`,
    }
  ]);

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
            {[1, 2, 3, 4, 5, 6].map((dt, i) => (
              <Grid
                key={i}
                xs={12}
                sm={6}
                lg={3}
              >
                <CardPaket data={dataPaket[0]} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  )

};

PelangganIndexPage.getLayout = (page) => (
  <DashboardLayout type="customer">
    {page}
  </DashboardLayout>
);

export default PelangganIndexPage;
