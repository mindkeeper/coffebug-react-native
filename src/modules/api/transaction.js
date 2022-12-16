import axios from 'axios';

const config = (token, params) => {
  return {headers: {'x-access-token': token}, params: params ? params : ''};
};

const baseUrl = `${process.env.BACKEND_URL}/api/transactions`;

export const createTrans = (body, token) =>
  axios.post(baseUrl, body, config(token));

export const getHistory = (token, params) =>
  axios.get(`${baseUrl}/history`, config(token, params));
