import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Stack, TextField, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { ApiGetDetailPaket } from 'src/api/paket';
import { ApiCheckAvailablePesanan, ApiCreatePesanan } from 'src/api/pesanan';
import ToastMessage from 'src/components/atoms/ToastMessage';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { toFormatPrice } from 'src/pages/admin/data-paket/tambah';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";


const slides = [{ src: 'https://placehold.co/600x400' }, { src: 'https://placehold.co/600x600' }, { src: 'https://placehold.co/600x700' }]

const DetailPaketPage = () => {
    const auth = useAuth();
    const router = useRouter()
    const [errMsgAvailable, setErrMsgAvailable] = useState('')
    const [dataPaket, setDataPaket] = useState({
        dekor_kamar_pengantin: "",
        dekor_panggung: "",
        gambar: [],
        gaun_wanita: "",
        harga:
            0,
        id: 0,
        kemeja_pria: "",
        make_up: "",
        meja_kursi_akad: "",
        meja_terima_tamu: "",
        nama: "",
        tenda_terima_tamu: ""
    })
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
    const [idPaket, setIdPaket] = useState('')
    const [formPemesanan, setFormPemesanan] = useState({
        waktuPenggunaan: '',
        waktuPengembalian: '',
        alamat: auth.user.alamat,
        nama: auth.user.username || auth.user.name,
        nomorTelpon: auth.user.nomor_telepon
    });

    const handleChange =
        (event) => {
            setFormPemesanan((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
            if (event.target.name === "waktuPenggunaan") {
                checkAvailable(dataPaket.id, event.target.value)
            }
        }

    const handleCreatePesanan = async () => {
        const res = await ApiCreatePesanan({
            idPaket: dataPaket.id,
            iduser: auth.user.id,
            harga: dataPaket.harga,
            waktuPenggunaan: formPemesanan.waktuPenggunaan,
            waktuPengembalian: formPemesanan.waktuPengembalian,
            nama: formPemesanan.nama,
            nomorTelepon: formPemesanan.nomorTelpon,
            alamat: formPemesanan.alamat,
            status: 'Akan Digunakan',
        })
        if (res.status === 200) {
            router.push('/customer/pesanan')
        } else {
            setErrMsg({
                status: 'error',
                msg: `Error. ${res.data.message}`,
                isOpen: true
            })
        }
    }

    const getDetailPaket = async (id) => {
        const res = await ApiGetDetailPaket(id)
        if (res.status === 200) {
            let imgs = res.data.data?.gambar?.split(",")
            let tempImgs = []
            imgs?.forEach((dt) => {
                tempImgs.push({
                    src: dt,
                })
            })
            setDataPaket({
                ...res.data.data,
                gambar: tempImgs
            })
        } else {
            setErrMsg({
                status: 'error',
                msg: `Error. ${res.data.message}`,
                isOpen: true
            })

        }
    }

    const disabledPesan = () => {
        if (errMsgAvailable === "ready" && formPemesanan.alamat && formPemesanan.nama && formPemesanan.nomorTelpon && formPemesanan.nomorTelpon && formPemesanan.waktuPenggunaan) return false
        return true
    }

    const checkAvailable = async (id, waktu) => {
        const res = await ApiCheckAvailablePesanan({ idPaket: id, waktuPenggunaan: waktu })
        if (res.status === 200) {
            setErrMsgAvailable(res.data.data)
        } else {
            setErrMsg({
                status: 'error',
                msg: `Error. ${res.data.message}`,
                isOpen: true
            })
        }
    }

    useEffect(() => {
        const id = router?.query?.id ?? ""
        if (id) {
            setIdPaket(id)
            getDetailPaket(id)
        }
    }, [router]);

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
                                        >Nama: {dataPaket.nama}</Typography>
                                        <Typography gutterBottom
                                        >Harga: Rp.{toFormatPrice(dataPaket.harga, 'IDR')}</Typography>
                                        {/* <Typography gutterBottom
                                        >Status: XXX</Typography> */}
                                        <Typography gutterBottom
                                        >Make Up: {dataPaket.make_up}</Typography>
                                        <Typography gutterBottom
                                        >Gaun Wanita: {dataPaket.gaun_wanita}</Typography>
                                        <Typography gutterBottom
                                        >Kemeja Pria: {dataPaket.kemeja_pria}</Typography>
                                        <Typography gutterBottom
                                        >Dekor Kamar Pengantin: {dataPaket.dekor_kamar_pengantin}</Typography>
                                        <Typography gutterBottom
                                        >Dekor Panggung: {dataPaket.dekor_panggung}</Typography>
                                        <Typography gutterBottom
                                        >Meja dan Kursi Akad: {dataPaket.meja_kursi_akad}</Typography>
                                        <Typography gutterBottom
                                        >Tenda Terima Tamu: {dataPaket.tenda_terima_tamu}</Typography>
                                        <Typography gutterBottom
                                        >Meja Terima Tamu: {dataPaket.meja_terima_tamu}</Typography>
                                        <Box display="flex" alignItems="flex-start" gap="10px">
                                            {dataPaket.gambar.map((url, i) => (

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
                                                <Typography style={{ marginTop: '-20px', marginBottom: '10px', marginLeft: '14px', fontWeight: 'bold', fontSize: '14px', color: errMsgAvailable === "not_ready" ? "red" : "green" }} >{errMsgAvailable === "not_ready" ? "Paket tidak tersedia" : "Paket tersedia"}</Typography>
                                            </Box>
                                            <TextField
                                                fullWidth
                                                type="date"
                                                size='small'

                                                label="Waktu Pengembalian"
                                                name="waktuPengembalian"
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
                                    <Button disabled={disabledPesan()} onClick={handleCreatePesanan} style={{ width: '200px' }} variant="contained">
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
                slides={dataPaket.gambar}
                open={index >= 0}
                close={() => setIndex(-1)}
            />
            <ToastMessage
                open={errMsg.isOpen}
                status={errMsg.status}
                message={errMsg.msg}
                onClose={handleCloseErrMsg}
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