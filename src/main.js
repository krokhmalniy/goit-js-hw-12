import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconOctagon from '../src/img/bi_x-octagon.svg';

const container = document.querySelector('.container');
const formSearch = document.querySelector('.form');
const formText = document.querySelector('.form-text');
const submitButton = document.querySelector('.submit-button');
let formTextValue = '';

formSearch.addEventListener('submit', event => {
  event.preventDefault();
  const query = formText.value.trim().toLowerCase();
  if (!query) {
    return iziToast.info({
      message: 'Please enter the query parameters',
      messageColor: '#FAFAFB',
      closeOnEscape: true,
    });
  }

  showLoader();
  submitButton.disabled = true;

  clearGallery();

  getImagesByQuery(query)
    .then(response => {
      if (response.data.hits.length === 0) {
        return iziToast.warning({
          backgroundColor: '#EF4040',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#FAFAFB',
          iconUrl: iconOctagon,
          closeOnEscape: true,
        });
      }
      createGallery(response.data.hits);
    })
    .catch(error => {
      iziToast.error({
        message: `${error}`,
        closeOnEscape: true,
      });
    })
    .finally(() => {
      hideLoader();
      submitButton.disabled = false;
    });

  formText.value = '';
});
