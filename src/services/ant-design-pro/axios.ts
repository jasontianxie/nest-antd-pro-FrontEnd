import axios from 'axios';

export const request = (opt: any) => {
  const defaultOption = {
    baseURL: '/api',
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user_token')}`,
    },
  };
  const option = { ...opt, ...defaultOption, url: `${opt.url}` };
  return axios(option)
    .then((response: any) => {
      return response.data;
    })
    .catch((error: any) => {
      // see https://www.npmjs.com/package/axios#handling-errors
      return error.response
        ? error.response.data
        : { code: -1, data: null, message: error.message };
    });
};
