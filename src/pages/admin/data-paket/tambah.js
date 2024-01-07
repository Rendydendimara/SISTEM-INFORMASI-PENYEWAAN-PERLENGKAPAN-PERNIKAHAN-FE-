import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel
} from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { subDays, subHours } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelection } from 'src/hooks/use-selection';
import { applyPagination } from 'src/utils/apply-pagination';
import InputFileDropDown from 'src/components/atoms/InputFileDropDown';
import CloseIcon from '@mui/icons-material/Close';
import { useSearchParams } from 'next/navigation';
import { ApiCreatePaket, ApiGetDetailPaket, ApiUpdatePaket } from 'src/api/paket';
import ToastMessage from 'src/components/atoms/ToastMessage';
import Dropzone from 'react-dropzone';

// Convert string price format into number
export const convertPriceStringToNumber = (
  value
) => {
  value = String(value);
  const normalizedValue = (value || '').replace(/[^0-9]/g, '');
  const result = parseInt(normalizedValue, 10);
  if (Number.isNaN(result)) return '';
  return result;
};

export const toFormatPrice = (
  number,
  currency,
  withTextCurrency) => {
  if (number === '' || number === null) return '';
  const parsedNumber = Number(number);
  if (Number.isNaN(parsedNumber)) return '';
  // const locale = currency === 'IDR' ? 'id-ID' : 'en-US';
  const locale = 'en-US'; // currency === 'IDR' ? 'id-ID' : 'en-US';
  let currencyText = withTextCurrency ? currency + ' ' : '';
  // let result = new Intl.NumberFormat(locale).format(parsedNumber);
  return currencyText + new Intl.NumberFormat(locale).format(parsedNumber);
  // return result;
};


const Page = () => {
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
  const [selectedIdUpdate, setSelectedIdUpdate] = useState()
  const [formState, setFormState] = useState('add');
  const searchParams = useSearchParams();
  const [values, setValues] = useState({
    namaPaket: '',
    harga: '',
    status: '',
    makeUp: '',
    gaunWanita: '',
    kemejaPria: '',
    dekorKamarPengantin: '',
    dekorPanggung: '',
    mejaDanKursiAkad: '',
    tendaTerimaTamu: '',
    mejaTerimaTamu: '',
    image1: undefined,
    image2: undefined,
    image3: undefined,
  });
  const [imageProduk, setImageProduk] = useState({
    image1: undefined,
    image2: undefined,
    image3: undefined,
  });
  const [imgUrl, setImgUrl] = useState({
    image1: '',
    image2: '',
    image3: '',
  });


  const handleDrop = (key, files) => {
    const file = files[0];
    // looping for validation file before upload
    const fileName = file.name.match(/\.[0-9a-z]+$/i)[0];
    const fileFormat = fileName.substring(1, fileName.length);
    const isImage =
      ['jpg', 'jpeg', 'png'].includes(fileFormat.toLowerCase()) ?? false;

    if (!isImage) {
      setErrMsg({
        status: 'error',
        msg: 'File harus gambar format png, jpg, jpeg',
        isOpen: false
      })
      return;
    }
    setValues({
      ...values,
      [key]: file,
    });
    setImageProduk({
      ...imageProduk,
      [key]: file,
    });
  };


  const handleChange =
    (event) => {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    }
  const handleSubmit =
    async (event) => {
      event.preventDefault();
      if (formState === 'add') {
        const res = await ApiCreatePaket({
          nama: values.namaPaket,
          harga: values.harga,
          makeUp: values.makeUp,
          gaunWanita: values.gaunWanita,
          kemejaPria: values.kemejaPria,
          dekorKamarPengantin: values.dekorKamarPengantin,
          dekorPanggung: values.dekorPanggung,
          mejaKursiAkad: values.mejaDanKursiAkad,
          tendaTerimaTamu: values.tendaTerimaTamu,
          mejaTerimaTamu: values.mejaTerimaTamu,
          image1: values.image1,
          image2: values.image2,
          image3: values.image3
        })
        if (res.status === 200) {
          setErrMsg({
            status: 'success',
            msg: 'Berhasil membuat paket',
            isOpen: true
          })
          resetForm()
        } else {
          setErrMsg({
            status: 'error',
            msg: `Gagal membuat paket. ${res.data.message}`,
            isOpen: true
          })
        }
      } else {
        let oldImages = [];
        if (!values.image1) {
          oldImages.push(imgUrl.image1);
        }
        if (!values.image2) {
          oldImages.push(imgUrl.image2);
        }
        if (!values.image3) {
          oldImages.push(imgUrl.image3);
        }
        const res = await ApiUpdatePaket({
          nama: values.namaPaket,
          harga: values.harga,
          makeUp: values.makeUp,
          gaunWanita: values.gaunWanita,
          kemejaPria: values.kemejaPria,
          dekorKamarPengantin: values.dekorKamarPengantin,
          dekorPanggung: values.dekorPanggung,
          mejaKursiAkad: values.mejaDanKursiAkad,
          tendaTerimaTamu: values.tendaTerimaTamu,
          mejaTerimaTamu: values.mejaTerimaTamu,
          image1: values.image1,
          image2: values.image2,
          image3: values.image3,
          id: selectedIdUpdate,
          oldImages: JSON.stringify(oldImages),
        })
        if (res.status === 200) {
          setErrMsg({
            status: 'success',
            msg: 'Berhasil update paket',
            isOpen: true
          })
          // resetForm()
        } else {
          setErrMsg({
            status: 'error',
            msg: `Gagal update paket. ${res.data.message}`,
            isOpen: true
          })
        }

      }
    }

  const thumbs = (key) => {
    if (imageProduk[key]) {
      const url = URL.createObjectURL(imageProduk[key]);

      return (
        <Box>
          <img
            src={url}
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'contain',
              objectPosition: 'center',
              placeholder: 'blur',
            }}
          />
          <Button w='full' size='xs' onClick={() => handleRemoveImages(key)}>
            Hapus
          </Button>
        </Box>
      );
    }
    if (imgUrl[key]) {
      return (
        <Box>
          <img
            src={imgUrl[key]}
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'contain',
              objectPosition: 'center',
              placeholder: 'blur',
            }}
          />
          <Button w='full' size='xs' onClick={() => handleRemoveImages(key)}>
            Hapus
          </Button>
        </Box>
      );
    }
    return <></>;
  };

  const handleRemoveImages = (key) => {
    setImageProduk({
      ...imageProduk,
      [key]: undefined,
    });
    setValues({
      ...values,
      [key]: undefined,
    });
    setImgUrl({
      ...imgUrl,
      [key]: '',
    });
  };

  const resetForm = (key) => {
    setImageProduk({
      ...imageProduk,
      [key]: undefined,
    });
    setValues({
      ...values,
      [key]: undefined,
    });
    setImgUrl({
      ...imgUrl,
      [key]: '',
    });
    setValues({
      namaPaket: '',
      harga: '',
      status: '',
      makeUp: '',
      gaunWanita: '',
      kemejaPria: '',
      dekorKamarPengantin: '',
      dekorPanggung: '',
      mejaDanKursiAkad: '',
      tendaTerimaTamu: '',
      mejaTerimaTamu: '',
      image1: undefined,
      image2: undefined,
      image3: undefined,
    });
  };

  const disableForm = () => {
    if (values.dekorKamarPengantin && values.dekorPanggung && values.gaunWanita && values.harga && values.kemejaPria && values.makeUp && values.mejaDanKursiAkad && values.mejaTerimaTamu && values.namaPaket) return false
    return true
  }

  const onOpenUpdateData = async (id) => {
    const res = await ApiGetDetailPaket(id)
    if (res.status === 200) {
      setValues({
        namaPaket: res.data.data.nama,
        harga: res.data.data.harga,
        // status: res.data.data.nama,
        makeUp: res.data.data.make_up,
        gaunWanita: res.data.data.gaun_wanita,
        kemejaPria: res.data.data.kemeja_pria,
        dekorKamarPengantin: res.data.data.dekor_kamar_pengantin,
        dekorPanggung: res.data.data.dekor_panggung,
        mejaDanKursiAkad: res.data.data.meja_kursi_akad,
        tendaTerimaTamu: res.data.data.tenda_terima_tamu,
        mejaTerimaTamu: res.data.data.meja_terima_tamu,
        image1: undefined,
        image2: undefined,
        image3: undefined,
      });
      let imgs = res.data.data?.gambar?.split(",") ?? []
      setImgUrl({
        image1: imgs[0] ? imgs[0].length > 5 ? imgs[0] : '' : '',
        image2: imgs[1] ? imgs[1].length > 5 ? imgs[1] : '' : '',
        image3: imgs[2] ? imgs[2].length > 5 ? imgs[2] : '' : '',
      });
    } else {
      setErrMsg({
        status: 'error',
        msg: `Error. ${res.data.message}`,
        isOpen: true
      })
    }
  }

  useEffect(() => {
    const action = searchParams.get('action');
    const id = searchParams.get('id');
    if (action === 'edit' && id) {
      setSelectedIdUpdate(id);
      setFormState('update');
      onOpenUpdateData(id);
    }
  }, [searchParams]);


  return (
    <>
      <Head>
        <title>
          Tambah Data Paket | Penyewaan Perlengkapan Pernikahan Di Nellysalon Waingapu
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
          <Typography variant="h4">
            {formState === 'add' ? 'Tambah' : 'Ubah'} Paket
          </Typography>

          <form
            autoComplete="off"
            noValidate
          // onSubmit={handleSubmit}
          >
            <Card style={{ marginTop: '20px' }}>
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <TextField
                    fullWidth
                    helperText="Nama paket tidak boleh sama"
                    label="Nama Paket"
                    name="namaPaket"
                    onChange={handleChange}
                    required
                    style={{ marginBottom: '15px' }}
                    value={values.namaPaket}
                  />
                  <TextField
                    fullWidth
                    label="Harga (Rp)"
                    name="harga"
                    required
                    style={{ marginBottom: '15px' }}
                    value={toFormatPrice(values.harga, 'IDR')}

                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: 'harga',
                          value: convertPriceStringToNumber(e.target.value),
                        },
                      })
                    }
                  />
                  {/* <FormControl fullWidth style={{ marginBottom: '15px' }}
                    sx={{ m: 1, minWidth: 120 }} size="medium">
                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={values.status}
                      label="Tipe User"
                      name="status"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Siap dipakai"}>Tersedia</MenuItem>
                      <MenuItem value={"Dalam pemakaian"}>Dalam pemakaian</MenuItem>
                    </Select>
                  </FormControl> */}
                  <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      xs={12}
                      md={6}
                    >
                      <TextField
                        fullWidth
                        label="Make up"
                        name="makeUp"
                        multiline
                        rows={3}
                        onChange={handleChange}
                        required
                        value={values.makeUp}
                      />
                    </Grid>
                    <Grid
                      xs={12}
                      md={6}
                    >
                      <TextField
                        multiline
                        rows={3}
                        fullWidth
                        label="Gaun Wanita"
                        name="gaunWanita"
                        onChange={handleChange}
                        required
                        value={values.gaunWanita}
                      />
                    </Grid>
                    <Grid
                      xs={12}
                      md={6}
                    >
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Kemeja Pria"
                        name="kemejaPria"
                        onChange={handleChange}
                        required
                        value={values.kemejaPria}
                      />
                    </Grid>
                    <Grid
                      xs={12}
                      md={6}
                    >
                      <TextField
                        fullWidth
                        label="Dekor Kamar Pengantin"
                        multiline
                        rows={3}
                        name="dekorKamarPengantin"
                        onChange={handleChange}
                        value={values.dekorKamarPengantin}
                      />
                    </Grid>
                    <Grid
                      xs={12}
                      md={6}
                    >
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Dekor Panggung"
                        name="dekorPanggung"
                        onChange={handleChange}
                        required
                        value={values.dekorPanggung}
                      />
                    </Grid>
                    <Grid
                      xs={12}
                      md={6}
                    >
                      <TextField
                        fullWidth
                        label="Meja Dan Kursi Akad"
                        multiline
                        rows={3}
                        name="mejaDanKursiAkad"
                        onChange={handleChange}
                        required
                        value={values.mejaDanKursiAkad}
                      />
                    </Grid>
                    <Grid
                      xs={12}
                      md={6}
                    >
                      <TextField
                        multiline
                        rows={3}
                        fullWidth
                        label="Tenda Terima Tamu"
                        name="tendaTerimaTamu"
                        onChange={handleChange}
                        required
                        value={values.tendaTerimaTamu}
                      />
                    </Grid>
                    <Grid
                      xs={12}
                      md={6}
                    >
                      <TextField
                        fullWidth
                        label="Meja Terima Tamu"
                        multiline
                        rows={3}
                        name="mejaTerimaTamu"
                        onChange={handleChange}
                        required
                        value={values.mejaTerimaTamu}
                      />
                    </Grid>
                  </Grid>
                  <Box mt="20px">
                    <FormControl isRequired my='3'>
                      <FormLabel >
                        Gambar (Maksimal 3 gambar)
                      </FormLabel>
                      <Box display="flex" gap='10px' alignItems='center'>
                        {imageProduk.image1 || imgUrl.image1 ? (
                          <Box my='5'>{thumbs('image1')}</Box>
                        ) : (
                          <Dropzone
                            onDrop={(file) => handleDrop('image1', file)}
                            multiple={false}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <section className='container'>
                                <div
                                  {...getRootProps({ className: 'dropzone' })}
                                  className='dropzone'
                                >
                                  <input {...getInputProps()} />
                                  <p>
                                    Seret 'dan' jatuhkan gambar profile di sini,
                                    atau klik untuk memilih file
                                  </p>
                                </div>
                              </section>
                            )}
                          </Dropzone>
                        )}
                        {imageProduk.image2 || imgUrl.image2 ? (
                          <Box my='5'>{thumbs('image2')}</Box>
                        ) : (
                          <Dropzone
                            onDrop={(file) => handleDrop('image2', file)}
                            multiple={false}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <section className='container'>
                                <div
                                  {...getRootProps({ className: 'dropzone' })}
                                  className='dropzone'
                                >
                                  <input {...getInputProps()} />
                                  <p>
                                    Seret 'dan' jatuhkan gambar profile di sini,
                                    atau klik untuk memilih file
                                  </p>
                                </div>
                              </section>
                            )}
                          </Dropzone>
                        )}
                        {imageProduk.image3 || imgUrl.image3 ? (
                          <Box my='5'>{thumbs('image3')}</Box>
                        ) : (
                          <Dropzone
                            onDrop={(file) => handleDrop('image3', file)}
                            multiple={false}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <section className='container'>
                                <div
                                  {...getRootProps({ className: 'dropzone' })}
                                  className='dropzone'
                                >
                                  <input {...getInputProps()} />
                                  <p>
                                    Seret 'dan' jatuhkan gambar profile di sini,
                                    atau klik untuk memilih file
                                  </p>
                                </div>
                              </section>
                            )}
                          </Dropzone>
                        )}
                      </Box>
                    </FormControl>
                  </Box>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  disabled={disableForm()}
                  onClick={handleSubmit} variant="contained">
                  {formState === 'add' ? 'Tambah' : 'Ubah'} Paket
                </Button>
              </CardActions>
            </Card>
          </form>
        </Container>
        <ToastMessage
          open={errMsg.isOpen}
          status={errMsg.status}
          message={errMsg.msg}
          onClose={handleCloseErrMsg}
        />
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
