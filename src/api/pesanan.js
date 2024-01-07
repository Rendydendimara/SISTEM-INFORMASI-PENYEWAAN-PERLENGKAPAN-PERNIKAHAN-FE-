import Axios from 'axios';
import { BACKEND_URL } from '../constant';
import { axiosWithToken } from './axios';

export const ApiGetListPesanan = async (userId) => {
  let url = `${BACKEND_URL}/pesanan/get-list`
  if (userId) {
    url = `${url}?userId=${userId}`
  }
  const response = await Axios.get(
    url
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  if (response) {
    return response;
  } else {
    return {
      status: 500,
      data: {
        message: 'Server error. Silakan hubungi admin',
      },
    };
  }
};

export const ApiCreatePesanan = async ({
  idPaket,
  iduser,
  harga,
  waktuPenggunaan,
  waktuPengembalian,
  nama,
  nomorTelepon,
  alamat,
  status,
}) => {

  const response = await Axios.post(
    `${BACKEND_URL}/pesanan/create`, {
    idPaket,
    iduser,
    harga,
    waktuPenggunaan,
    waktuPengembalian,
    nama,
    nomorTelepon,
    alamat,
    status,
  }
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  if (response) {
    return response;
  } else {
    return {
      status: 500,
      data: {
        message: 'Server error. Silakan hubungi admin',
      },
    };
  }
};

export const ApiUpdateStatusPesanan = async ({
  status, id
}) => {
  const response = await Axios.put(
    `${BACKEND_URL}/pesanan/update-status`, { status, id }
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  if (response) {
    return response;
  } else {
    return {
      status: 500,
      data: {
        message: 'Server error. Silakan hubungi admin',
      },
    };
  }
};

export const ApiGetDetailPesanan = async (id) => {
  const response = await axiosWithToken().get(
    `${BACKEND_URL}/pesanan/detail/${id}`
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  if (response) {
    return response;
  } else {
    return {
      status: 500,
      data: {
        message: 'Server error. Silakan hubungi admin',
      },
    };
  }
};

export const ApiDeletePesanan = async (id) => {
  const response = await axiosWithToken().delete(
    `${BACKEND_URL}/pesanan/delete/${id}`
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  if (response) {
    return response;
  } else {
    return {
      status: 500,
      data: {
        message: 'Server error. Silakan hubungi admin',
      },
    };
  }
};


export const ApiCheckAvailablePesanan = async ({
  idPaket, waktuPenggunaan
}) => {

  const response = await Axios.post(
    `${BACKEND_URL}/pesanan/check-available`, {
    idPaket,
    waktuPenggunaan,
  }
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  if (response) {
    return response;
  } else {
    return {
      status: 500,
      data: {
        message: 'Server error. Silakan hubungi admin',
      },
    };
  }
};
