import axios from 'axios';

const BaseUrl = process.env.BACKEND_URL;

const config = token => {
  return {
    headers: {
      'x-access-token': `${token}`,
    },
  };
};

export const getUser = token => {
  const URL = `${BaseUrl}/api/users`;
  console.log('util', URL);
  return axios.get(URL, config(token));
};
