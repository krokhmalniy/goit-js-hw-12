import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '52758797-16c779dc2baa00e6d4d028fc2';
const per_page = 15;

export async function getImagesByQuery(query, page = 1) {
  const paramsOfSearch = {
    key: API_KEY,
    q: query,
    page,
    per_page,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  const response = await axios.get(`${BASE_URL}`, {
    params: paramsOfSearch,
  });
  return response;
}