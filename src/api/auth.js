import Axios from 'axios';
import { BACKEND_URL } from '../constant';
import { axiosWithToken } from './axios';

export const ApiLogin = async ({
  email, password, userType
}) => {
  const response = await Axios.post(
    `${BACKEND_URL}/auth/login`,
    {
      email, password, userType
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

export const ApiCheckLogin = async ({
  token, userType
}) => {
  const response = await Axios.post(
    `${BACKEND_URL}/auth/check-login`,
    {
      token, userType
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

export const ApiLogout = async ({
  userType, userId
}) => {
  const response = await axiosWithToken().post(
    `${BACKEND_URL}/auth/logout`,
    {
      userId,
      userType,
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

export const ApiRegister = async ({
  username, password, alamat, nomorTelepon, email
}) => {
  const response = await Axios.post(
    `${BACKEND_URL}/auth/register`,
    {
      username, password, alamat, nomorTelepon, email
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

export const ApiUpdateUser = async ({ username, alamat, nomorTelepon, id }) => {
  const response = await Axios.put(
    `${BACKEND_URL}/auth/update-user`, { username, alamat, nomorTelepon, id }
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

export const ApiGetListUser = async () => {
  const response = await Axios.get(
    `${BACKEND_URL}/auth/get-all-user`
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
