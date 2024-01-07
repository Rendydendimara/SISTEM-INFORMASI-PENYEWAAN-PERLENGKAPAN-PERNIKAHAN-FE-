import { Box, Card, CardContent, CardHeader, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { toFormatPrice } from './tambah';
import ToastMessage from 'src/components/atoms/ToastMessage';
import { ApiGetDetailPaket } from 'src/api/paket';
import { useSearchParams } from 'next/navigation';

const slides = [{ src: 'https://placehold.co/600x400' }, { src: 'https://placehold.co/600x600' }, { src: 'https://placehold.co/600x700' }]


const DetailPaketPage = () => {
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
  const [index, setIndex] = useState(-1);
  const searchParams = useSearchParams()
  const [images, setImages] = useState([])
  const [data, setData] = useState({
    dekor_kamar_pengantin: '',
    dekor_panggung: '',
    gambar: '',
    gaun_wanita: '',
    harga: '',
    id: '',
    kemeja_pria: '',
    make_up: '',
    meja_kursi_akad: '',
    meja_terima_tamu: '',
    nama: '',
    tenda_terima_tamu: '',
  })


  const getData = async (id) => {
    const res = await ApiGetDetailPaket(id)
    if (res.status === 200) {
      setData(res.data.data)
      let imgs = res.data.data?.gambar?.split(",")
      let tempImgs = []
      imgs?.forEach((dt) => {
        tempImgs.push({
          src: dt,
        })
      })
      setImages(tempImgs)
    } else {
      setErrMsg({
        status: 'error',
        msg: `Error. ${res.data.message}`,
        isOpen: true
      })
    }
  }

  useEffect(() => {
    const id = searchParams.get('id');
    getData(id)
  }, [searchParams]);


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
                    >Nama: {data.nama}</Typography>
                    <Typography gutterBottom
                    >Harga: {toFormatPrice(data.harga, 'IDR')}</Typography>
                    {/* <Typography gutterBottom
                    >Status: {data.nama}</Typography> */}
                    <Typography gutterBottom
                    >Make Up: {data.make_up}</Typography>
                    <Typography gutterBottom
                    >Gaun Wanita: {data.gaun_wanita}</Typography>
                    <Typography gutterBottom
                    >Kemeja Pria: {data.kemeja_pria}</Typography>
                    <Typography gutterBottom
                    >Dekor Kamar Pengantin: {data.dekor_kamar_pengantin}</Typography>
                    <Typography gutterBottom
                    >Dekor Panggung: {data.dekor_panggung}</Typography>
                    <Typography gutterBottom
                    >Meja dan Kursi Akad: {data.meja_kursi_akad}</Typography>
                    <Typography gutterBottom
                    >Tenda Terima Tamu: {data.tenda_terima_tamu}</Typography>
                    <Typography gutterBottom
                    >Meja Terima Tamu: {data.meja_terima_tamu}</Typography>
                    <Box display="flex" alignItems="flex-start" gap="10px">
                      {images.map((url, i) => (
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
          slides={images}
          open={index >= 0}
          close={() => setIndex(-1)}
        />
        <ToastMessage
          open={errMsg.isOpen}
          status={errMsg.status}
          message={errMsg.msg}
          onClose={handleCloseErrMsg}
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
