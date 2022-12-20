import axios from 'axios';

const config = token => {
  return {headers: {'x-access-token': token}};
};

const baseUrl = `${process.env.BACKEND_URL}/api/products`;

export const getProducts = query => {
  return axios.get(baseUrl, {params: query});
};

export const getDetail = id => axios.get(`${baseUrl}/${id}`);

export const createProduct = (body, token) =>
  axios.post(baseUrl, body, config(token));
