import axios from 'axios';

const baseUrl = `${process.env.BACKEND_URL}/api/promos`;

export const getPromos = query => axios.get(baseUrl, {params: query});
