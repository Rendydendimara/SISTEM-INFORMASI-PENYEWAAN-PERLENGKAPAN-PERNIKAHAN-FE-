import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { ApiUpdateUser } from 'src/api/auth';
import ToastMessage from 'src/components/atoms/ToastMessage';


export const AccountProfileCustomer = () => {
  const auth = useAuth();
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
  const [values, setValues] = useState({
    username: auth.user.username || auth.user.name,
    email: auth.user.email,
    phone: auth.user.nomor_telepon,
    alamat: auth.user.alamat,
  });

  const handleChange =
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    }

  const handleSubmit =
    async (event) => {
      event.preventDefault();
      const res = await ApiUpdateUser({
        username: values.username, alamat: values.alamat, nomorTelepon: values.phone, id: auth.user.id
      })
      if (res.status === 200) {
        setErrMsg({
          status: 'success',
          msg: `Berhasil Update Profile`,
          isOpen: true
        })

      } else {
        setErrMsg({
          status: 'error',
          msg: `Error. ${res.data.message}`,
          isOpen: true
        })
      }
    }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Informasi akun bisa di ubah"
          title="Akun"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
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
                  label="Nama"
                  name="username"
                  onChange={handleChange}
                  required
                  value={values.username}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Alamat email"
                  name="email"
                  onChange={handleChange}
                  disabled
                  value={values.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  onChange={handleChange}
                  type="number"
                  value={values.phone}
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
                  label="Alamat"
                  name="alamat"
                  onChange={handleChange}
                  value={values.alamat}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={handleSubmit} variant="contained">
            Simpan
          </Button>
        </CardActions>
      </Card>
      <ToastMessage
        open={errMsg.isOpen}
        status={errMsg.status}
        message={errMsg.msg}
        onClose={handleCloseErrMsg}
      />

    </form>
  );
};
