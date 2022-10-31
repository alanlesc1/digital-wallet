import axios from 'axios';

export const API_URL = 'http://localhost:3000/graphql';
export const TIMEOUT = 10000;

export const request = async (query, variables, token) => {
  const headers = token ?
    {
      headers: {
        'Authorization': 'Bearer ' + token,
      },
    }
    : null;

  return axios.post(
    API_URL,
    {
      query,
      variables,
    },
    headers
  );
}
