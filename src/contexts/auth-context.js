import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import { ApiCheckLogin, ApiLogin, ApiRegister } from 'src/api/auth';
import { localClearToken, localLoadToken, localSaveToken } from 'src/utils/token';
import { getLocal, setLocal } from 'src/utils/localStorage';
import { USER_TYPE } from 'src/constant/localStorage';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      const token = localLoadToken()
      const userType = getLocal(USER_TYPE)
      const res = await ApiCheckLogin({ token, userType })
      if (res.status === 200) {
        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: res.data.data
        });
      } else {
        dispatch({
          type: HANDLERS.SIGN_OUT
        });
        localClearToken()
        setLocal(USER_TYPE, '')
      }
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Anika Visser',
      email: 'anika.visser@devias.io'
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  const signIn = async (email, password, userType) => {
    try {
      const res = await ApiLogin({ email, password, userType })
      if (res.status === 200) {
        window.sessionStorage.setItem('authenticated', 'true');
        const user = {
          id: res.data.data.id,
          avatar: '/assets/avatars/avatar-anika-visser.png',
          name: res.data.data.username,
          email: res.data.data.email,
          hakAkses: res.data.data.hak_akses,
          alamat: res.data.data.alamat,
          nomor_telepon: res.data.data.nomor_telepon,
        };
        localSaveToken(res.data.data.token)
        setLocal(USER_TYPE, userType)
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user
        });
      } else {
        throw new Error(res.data.message ?? 'Error login');
      }
    } catch (err) {
      console.error(err);
      throw new Error(err?.message ?? 'Error login');
    }
  };

  const signUp = async ({ username, password, alamat, nomorTelepon, email }) => {
    try {
      const res = await ApiRegister({ username, password, alamat, nomorTelepon, email })
      if (res.status === 200) {
      } else {
        throw new Error(res.data.message ?? 'Error login');
      }
    } catch (err) {
      console.error(err);
      throw new Error(err?.message ?? 'Error login');
    }
  };

  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
    localClearToken()
    setLocal(USER_TYPE, '')
    window.sessionStorage.setItem('authenticated', 'false');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
