import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
import NetInfo from '@react-native-community/netinfo';
import {toast} from 'utils/common';
import I18n from 'utils/language/i18n';
import {USER_DATA, getUserStorage} from 'hooks/useStorage';
import store from 'store';
import {loadingAction} from 'store/actions/loadingAction';
import {removeToken} from 'services';
import {userDataAction} from 'store/actions/userActions';

const getUserStorageLogin = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return false;
  } catch (error) {
    return false;
  }
};

const getLogInData = async () => {
  const result = await getUserStorageLogin('@USER_DATA:key');
  return result;
};

const axiosClient = axios.create({
  timeout: 30000,
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async function (config) {
    const auth = await getLogInData();

    if (auth && auth.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        toast('error', I18n.t('NO_NETWORK'));
      }
    });
    const originalConfig = error.config;
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      const result = await getUserStorage(`@${USER_DATA}:key`);
      const oldToken = result.refreshToken;
      return axiosClient
        .post(apiPaths.refreshToken, {token: oldToken})
        .then(res => {
          const newToken = res.data.data.refreshToken;
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axios.request(originalConfig);
        })
        .catch(async err => {
          store.dispatch(loadingAction(true));
          removeToken();
          store.dispatch(userDataAction({}));
          await AsyncStorage.removeItem(`@${USER_DATA}:key`);
          store.dispatch(loadingAction(false));
          throw err;
        });
    }
    return Promise.reject(error);
  },
);

export default axiosClient;

export const apiPaths = {
  login: 'auth/sign-in',
  refreshToken: 'auth/refresh-token',
};
