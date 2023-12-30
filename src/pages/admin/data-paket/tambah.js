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
  MenuItem
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

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@devias.io',
    name: 'Carson Darrin',
    phone: '304-428-3097'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@devias.io',
    name: 'Fran Perez',
    phone: '712-351-5711'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive'
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@devias.io',
    name: 'Jie Yan Song',
    phone: '770-635-2682'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Madrid',
      country: 'Spain',
      name: 'Anika Visser',
      street: '4158  Hedge Street'
    },
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'anika.visser@devias.io',
    name: 'Anika Visser',
    phone: '908-691-3242'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247'
    },
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: 'miron.vitold@devias.io',
    name: 'Miron Vitold',
    phone: '972-333-4106'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road'
    },
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: 'penjani.inyene@devias.io',
    name: 'Penjani Inyene',
    phone: '858-602-3409'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188  Armbrester Drive'
    },
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: 'omar.darobe@devias.io',
    name: 'Omar Darobe',
    phone: '415-907-2647'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'Los Angeles',
      country: 'USA',
      state: 'California',
      street: '1798  Hickory Ridge Drive'
    },
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: 'siegbert.gottfried@devias.io',
    name: 'Siegbert Gottfried',
    phone: '702-661-1654'
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'Murray',
      country: 'USA',
      state: 'Utah',
      street: '3934  Wildrose Lane'
    },
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: 'iulia.albu@devias.io',
    name: 'Iulia Albu',
    phone: '313-812-8947'
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    address: {
      city: 'Salt Lake City',
      country: 'USA',
      state: 'Utah',
      street: '368 Lamberts Branch Road'
    },
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: 'nasimiyu.danai@devias.io',
    name: 'Nasimiyu Danai',
    phone: '801-301-7894'
  }
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

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
  });
  const [listPhotoExistAlbumUpdated, setListPhotoExistAlbumUpdated] = ([]);
  const [listPhoto, setListPhoto] = useState([]);

  const handleChange = useCallback(
    (event) => {
      console.log(event.target.name)
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  const handleDrop = (data) => {
    console.log('data', data)
    if (data.length <= 3) {
      const MAX_SIZE_FILE_UPLOAD = 5034166; // 5mb
      let errorFileSize = false;
      let errorFileFormat = false;

      for (let i = 0; i < data.length; i++) {
        if (data[i].size > MAX_SIZE_FILE_UPLOAD) errorFileSize = true;
        const fileName = data[i].name.match(/\.[0-9a-z]+$/i)[0];
        const fileFormat = fileName.substring(1, fileName.length);
        if (!(['jpg', 'jpeg', 'png', 'svg', 'gif'].includes(fileFormat.toLowerCase()))) errorFileFormat = true
      }

      if (errorFileFormat) {
        // toast({
        //   position: 'bottom',
        //   title: MESSAGE_FILE_INVALID_FORMAT.title,
        //   description: MESSAGE_FILE_INVALID_FORMAT.message,
        //   status: 'error',
        //   duration: 8000,
        //   isClosable: true,
        // });
        return;
      }
      if (errorFileSize) {
        // toast({
        //   position: 'bottom',
        //   title: MESSAGE_FILE_MAXIMUM_SIZE.title,
        //   description: MESSAGE_FILE_MAXIMUM_SIZE.message("1"),
        //   status: 'error',
        //   duration: 8000,
        //   isClosable: true,
        // });
        return;
      } else {
        console.log('data', data)
        setListPhoto([...listPhoto, ...data]);
      }

    }
  };


  const removeListImage = (index) => {
    setListPhoto([
      ...listPhoto.slice(0, index),
      ...listPhoto.slice(index + 1, listPhoto.length),
    ])
  }

  const renderPreviewImage = () => {
    let urlImages = []
    listPhoto.forEach((dt) => {
      urlImages.push(URL.createObjectURL(dt))
    })

    return (
      <Box display="flex" alignItems="flex-start" gap="10px">
        {urlImages.map((url, i) => (
          <Box position='relative' w='fit-content' key={i}>
            <CloseIcon style={{
              position: 'absolute',
              right: 0,
              top: 0,
              cursor: 'pointer',
            }}
              onClick={() => removeListImage(i)}
            />
            <img
              src={url}
              style={{
                width: '165px',
                height: '210px',
                objectFit: 'contain',
                objectPosition: 'center',
                borderRadius: '8px',

              }}
            />
          </Box>
        ))}
      </Box>
    );
  };

  useEffect(() => {
    const action = searchParams.get('action');
    const id = searchParams.get('id');
    if (action === 'edit' && id) {
      setSelectedIdUpdate(id);
      setFormState('update');
      // onOpenUpdateData(id);
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
                  // value={values.firstName}
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
                  <FormControl fullWidth style={{ marginBottom: '15px' }}
                    sx={{ m: 1, minWidth: 120 }} size="medium">
                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={values.status}
                      label="Tipe User"
                      name="status "
                      onChange={handleChange}
                    >
                      <MenuItem value={"Siap dipakai"}>Siap dipakai</MenuItem>
                      <MenuItem value={"Dalam pemakaian"}>Dalam pemakaian</MenuItem>
                    </Select>
                  </FormControl>
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
                      // value={values.firstName}
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
                    {listPhoto.length === 0 && (
                      <InputFileDropDown
                        label="Tambahkan gambar (maksimal 3)"
                        handleDrop={handleDrop}
                        acceptFile={{
                          'image/png': [],
                          'image/jpeg': [],
                          'image/jpg': [],
                          'image/svg+xml': [],
                          'image/gif': [],
                        }}
                      />
                    )}
                    {listPhoto.length > 0 && (
                      renderPreviewImage()
                    )}
                  </Box>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button variant="contained">
                  {formState === 'add' ? 'Tambah' : 'Ubah'} Paket
                </Button>
              </CardActions>
            </Card>
          </form>

        </Container>
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
