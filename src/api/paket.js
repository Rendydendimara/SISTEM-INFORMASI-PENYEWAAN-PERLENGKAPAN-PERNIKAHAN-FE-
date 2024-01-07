import Axios from 'axios';
import { BACKEND_URL } from '../constant';
import { axiosWithToken } from './axios';

export const ApiGetListPaket = async () => {
  const response = await Axios.get(
    `${BACKEND_URL}/paket/get-list`
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

export const ApiCreatePaket = async ({
  nama,
  harga,
  makeUp,
  gaunWanita,
  kemejaPria,
  dekorKamarPengantin,
  dekorPanggung,
  mejaKursiAkad,
  tendaTerimaTamu,
  mejaTerimaTamu,
  image1,
  image2,
  image3
}) => {
  let formData = new FormData();
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  if (image1) {
    formData.append('images', image1);
  }
  if (image2) {
    formData.append('images', image2);
  }
  if (image3) {
    formData.append('images', image3);
  }

  formData.append('nama', String(nama));
  formData.append('harga', String(harga));
  formData.append('makeUp', String(makeUp));
  formData.append('gaunWanita', String(gaunWanita));
  formData.append('kemejaPria', String(kemejaPria));
  formData.append('dekorKamarPengantin', String(dekorKamarPengantin));
  formData.append('dekorPanggung', String(dekorPanggung));
  formData.append('mejaKursiAkad', String(mejaKursiAkad));
  formData.append('tendaTerimaTamu', String(tendaTerimaTamu));
  formData.append('mejaTerimaTamu', String(mejaTerimaTamu));

  const response = await Axios.post(
    `${BACKEND_URL}/paket/create`, formData, config
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

export const ApiUpdatePaket = async ({
  id,
  oldImages,
  nama,
  harga,
  makeUp,
  gaunWanita,
  kemejaPria,
  dekorKamarPengantin,
  dekorPanggung,
  mejaKursiAkad,
  tendaTerimaTamu,
  mejaTerimaTamu,
  image1,
  image2,
  image3
}) => {
  let formData = new FormData();
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  if (image1) {
    formData.append('images', image1);
  }
  if (image2) {
    formData.append('images', image2);
  }
  if (image3) {
    formData.append('images', image3);
  }

  formData.append('id', String(id));
  formData.append('oldImages', String(oldImages));
  formData.append('nama', String(nama));
  formData.append('harga', String(harga));
  formData.append('makeUp', String(makeUp));
  formData.append('gaunWanita', String(gaunWanita));
  formData.append('kemejaPria', String(kemejaPria));
  formData.append('dekorKamarPengantin', String(dekorKamarPengantin));
  formData.append('dekorPanggung', String(dekorPanggung));
  formData.append('mejaKursiAkad', String(mejaKursiAkad));
  formData.append('tendaTerimaTamu', String(tendaTerimaTamu));
  formData.append('mejaTerimaTamu', String(mejaTerimaTamu));

  const response = await Axios.put(
    `${BACKEND_URL}/paket/update`, formData, config
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

export const ApiGetDetailPaket = async (id) => {
  const response = await axiosWithToken().get(
    `${BACKEND_URL}/paket/detail/${id}`
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

export const ApiDeletePaket = async (id) => {
  const response = await axiosWithToken().delete(
    `${BACKEND_URL}/paket/delete/${id}`
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
