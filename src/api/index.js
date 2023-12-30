import Axios from 'axios';
import { BACKEND_URL } from '../constant';
import { axiosWithToken } from './axios';
import fileDownload from 'js-file-download';

export const ApiGetListJenisBarang = async () => {
  const response = await axiosWithToken().get(
    `${BACKEND_URL}/jenis-barang/get-list`
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

export const ApiGetListUnit = async () => {
  const response = await axiosWithToken().get(
    `${BACKEND_URL}/unit/get-list`
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

export const ApiGetDetailBarang = async (id) => {
  const response = await axiosWithToken().get(
    `${BACKEND_URL}/barang/detail/${id}`
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

export const ApiDeleteBarang = async (id) => {
  const response = await axiosWithToken().delete(
    `${BACKEND_URL}/barang/delete/${id}`
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

export const ApiCetakLaporan = async () => {
  const response = await axiosWithToken().get(
    `${BACKEND_URL}/barang/print-laporan`, {
    responseType: 'blob',
  })
    .then((response) => {
      fileDownload(
        response.data,
        `${new Date().getTime().toString()}-laporan.pdf`
      );
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

export const ApiDeleteJenisBarang = async (id) => {
  const response = await axiosWithToken().delete(
    `${BACKEND_URL}/jenis-barang/delete/${id}`
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

export const ApiUpdateJenisBarang = async ({ namaJenisBarang, kodeJenisBarang, id }) => {
  const response = await axiosWithToken().put(
    `${BACKEND_URL}/jenis-barang/update`, { namaJenisBarang, kodeJenisBarang, id }
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

export const ApiCreateJenisBarang = async ({ namaJenisBarang, kodeJenisBarang }) => {
  const response = await axiosWithToken().post(
    `${BACKEND_URL}/jenis-barang/create`, { namaJenisBarang, kodeJenisBarang, }
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

export const ApiDeleteUnit = async (id) => {
  const response = await axiosWithToken().delete(
    `${BACKEND_URL}/unit/delete/${id}`
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

export const ApiUpdateUnit = async ({ namaUnit, alamat, id }) => {
  const response = await axiosWithToken().put(
    `${BACKEND_URL}/unit/update`, { namaUnit, alamat, id }
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

export const ApiCreateUnit = async ({ namaUnit, alamat }) => {
  const response = await axiosWithToken().post(
    `${BACKEND_URL}/unit/create`, { namaUnit, alamat }
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

export const ApiGetListBarangByUnit = async (id) => {
  const response = await axiosWithToken().get(
    `${BACKEND_URL}/barang/get-list-by-unit/${id}`
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

export const ApiGetAllUser = async (id) => {
  const response = await axiosWithToken().get(
    `${BACKEND_URL}/auth/get-all-user/`
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

export const ApiCreateUser = async ({ username, password, nama, nip, unitId }) => {
  const response = await axiosWithToken().post(
    `${BACKEND_URL}/auth/create`, { username, password, nama, nip, unitId }
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

export const ApiUpdateUser = async ({ username, password, nama, nip, unitId, id }) => {
  const response = await axiosWithToken().put(
    `${BACKEND_URL}/auth/update-user`, { username, password, nama, nip, unitId, id }
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

export const ApiDeleteUser = async (id) => {
  const response = await axiosWithToken().delete(
    `${BACKEND_URL}/auth/delete/${id}`
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

export const ApiGetLaporanJenis = async (id) => {
  const response = await axiosWithToken().get(
    `${BACKEND_URL}/barang/get-laporan-per-jenis`
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

export const ApiCetakLaporanJenis = async () => {
  const response = await axiosWithToken().get(
    `${BACKEND_URL}/barang/print-laporan-per-jenis`, {
    responseType: 'blob',
  })
    .then((response) => {
      fileDownload(
        response.data,
        `${new Date().getTime().toString()}-laporan-jenis.pdf`
      );
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
}

export const ApiGetLaporanJenisByUnit = async (id) => {
  const response = await axiosWithToken().get(
    `${BACKEND_URL}/barang/get-laporan-per-jenis-by-unit/${id}`
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

export const ApiCetakLaporanJenisByUnit = async (id) => {
  const response = await axiosWithToken().get(
    `${BACKEND_URL}/barang/print-laporan-per-jenis-by-unit/${id}`, {
    responseType: 'blob',
  })
    .then((response) => {
      fileDownload(
        response.data,
        `${new Date().getTime().toString()}-laporan-jenis.pdf`
      );
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
}

export const ApiCetakLaporanByUnit = async (id) => {
  const response = await axiosWithToken().get(
    `${BACKEND_URL}/barang/print-laporan-by-unit/${id}`, {
    responseType: 'blob',
  })
    .then((response) => {
      fileDownload(
        response.data,
        `${new Date().getTime().toString()}-laporan.pdf`
      );
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

export const ApiCetakLaporanByTahun = async (id) => {
  let url = id ? `${BACKEND_URL}/barang/print-laporan-by-tahun?id=${id}` : `${BACKEND_URL}/barang/print-laporan-by-tahun`
  const response = await axiosWithToken().get(url, {
    responseType: 'blob',
  })
    .then((response) => {
      fileDownload(
        response.data,
        `${new Date().getTime().toString()}-laporan.pdf`
      );
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

