import axios from 'axios';

const baseUrl = `${process.env.BACKEND_URL}/api/users`;

const config = token => {
  return {
    headers: {
      'x-access-token': `${token}`,
    },
  };
};

export const getUser = token => {
  const URL = `${baseUrl}`;
  return axios.get(URL, config(token));
};

export const editUser = (body, token) =>
  axios.patch(`${baseUrl}/edit-profile`, body, config(token));
