import axios, { AxiosResponse } from 'axios';
import { Token } from './token';

export let myToken:Token=new Token("");

const axiosInstance = axios.create({
	baseURL: 'https://api.nua.ge/',
	timeout: 15000
});

axiosInstance.interceptors.request.use(
    (config:any) => {     
      const auth = myToken.token ? `Bearer ${myToken.token}` : '';
      config.headers.common['Authorization'] = auth;
      return config;
    },
    (error) => Promise.reject(error),
  );

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
	get: (url: string) => axiosInstance.get(url).then(responseBody),
	post: (url: string, body: {}) => axiosInstance.post(url, body).then(responseBody),
	put: (url: string, body: {}) => axiosInstance.put(url, body).then(responseBody),
    patch: (url: string, body: {}) => axiosInstance.put(url, body).then(responseBody),
	delete: (url: string) => axiosInstance.delete(url).then(responseBody),
};

