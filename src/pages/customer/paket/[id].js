import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { toFormatPrice } from 'src/pages/admin/data-paket/tambah';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


const slides = [{ src: 'https://placehold.co/600x400' }, { src: 'https://placehold.co/600x600' }, { src: 'https://placehold.co/600x700' }]

const DetailPaketPage = () => {
    const [index, setIndex] = useState(-1);
    const router = useRouter()
    const [formPemesanan, setFormPemesanan] = useState({
        waktuPenggunaan: '',
        waktuPengembalian: '',
        alamat: '',
        nama: '',
        nomorTelpon: ''
    });

    const handleChange = useCallback(
        (event) => {
            console.log(event.target.name)
            setFormPemesanan((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    const handleCreatePesanan = () => {
        router.push('/customer/pesanan')
    }

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
                            <Card style={{ padding: '10px' }}>
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
                                <CardHeader
                                    subheader="Form pemesanan paket"
                                    title="Pemesanan"
                                />
                                <CardContent sx={{ pt: 0 }} style={{ paddingBottom: '0px', marginTop: '10px' }}>
                                    <Box>
                                        <Grid
                                            container
                                            spacing={2}
                                        >
                                            <Box width="100%">
                                                <TextField
                                                    fullWidth
                                                    type="date"
                                                    helperText="Sistem akan melakukan pengecekan otomastis pada tanggal yang kamu pilih paket tersebut apakah tersedia"
                                                    label="Waktu Penggunaan"
                                                    name="waktuPenggunaan"
                                                    onChange={handleChange}
                                                    required
                                                    size='small'
                                                    style={{ marginBottom: '15px' }}
                                                    value={formPemesanan.waktuPenggunaan}
                                                />
                                                <Typography style={{ marginTop: '-20px', marginBottom: '10px', marginLeft: '14px', fontWeight: 'bold', fontSize: '14px', color: new Date(formPemesanan.waktuPenggunaan).getDate() === 20 ? "red" : "green" }} >{new Date(formPemesanan.waktuPenggunaan).getDate() === 20 ? "Paket tidak tersedia" : "Paket tersedia"}</Typography>
                                            </Box>
                                            <TextField
                                                fullWidth
                                                type="date"
                                                size='small'

                                                label="Waktu Pengembalian"
                                                name="waktuPenggunaan"
                                                onChange={handleChange}
                                                required
                                                style={{ marginBottom: '15px' }}
                                                value={formPemesanan.waktuPengembalian}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Nama"
                                                name="nama"
                                                onChange={handleChange}
                                                required
                                                size='small'
                                                style={{ marginBottom: '15px' }}
                                                value={formPemesanan.nama}
                                            />
                                            <TextField
                                                fullWidth
                                                size='small'
                                                label="Nomor Telpon"
                                                name="nomorTelpon"
                                                onChange={handleChange}
                                                required
                                                style={{ marginBottom: '15px' }}
                                                value={formPemesanan.nomorTelpon}
                                            />
                                            <TextField
                                                fullWidth
                                                multiline
                                                size='small'
                                                rows={2}
                                                label="Alamat"
                                                name="alamat"
                                                onChange={handleChange}
                                                required
                                                style={{ marginBottom: '15px' }}
                                                value={formPemesanan.alamat}
                                            />
                                        </Grid>

                                    </Box>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'flex-start' }}>
                                    <Button onClick={handleCreatePesanan} style={{ width: '200px' }} variant="contained">
                                        Pesan
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    </Stack>
                </Container>
            </Box>
            <Lightbox
                index={index}
                slides={slides}
                open={index >= 0}
                close={() => setIndex(-1)}
            />

        </>

    )
};

DetailPaketPage.getLayout = (page) => (
    <DashboardLayout type="customer">
        {page}
    </DashboardLayout>
);

export default DetailPaketPage;
