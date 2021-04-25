import axios from 'axios';

const api = 'https://pokeapi.co/api/v2/';

export const apiCall = axios.create({
  baseURL: api,
  headers: {
    'Content-type': 'application/json',
  },
});
