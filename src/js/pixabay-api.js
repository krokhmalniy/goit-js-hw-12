import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52758797-16c779dc2baa00e6d4d028fc2';

export function getImagesByQuery(query) {
  const paramsOfSearch = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  return axios
    .get(`${BASE_URL}`, {
      params: paramsOfSearch,
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
}