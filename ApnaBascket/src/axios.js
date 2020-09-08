import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Constants from './constants';
import { navigateToAuth } from './helpers';

// Request interceptor
axios.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

// Response interceptor
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error && error.response && error.response.status === Constants.HTTP_STATUS_CODE.UN_AUTHORIZED) {
            return Promise.reject(navigateToAuth());
        }
        return Promise.reject(error);
    },
);

export default axios;
