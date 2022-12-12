import axios from 'axios';

const config = token => {
  return {header: {'x-access-token': token}};
};

const baseUrl = `${process.env.BACKEND_URL}/api/products`;

export const getProducts = query => {
  return axios.get(baseUrl, {params: query});
};

export const getDetail = id => axios.get(`${baseUrl}/${id}`);
