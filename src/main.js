import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconOctagon from '../src/img/bi_x-octagon.svg';

const container = document.querySelector('.container');
const formSearch = document.querySelector('.form');
const formText = document.querySelector('.form-text');
const submitButton = document.querySelector('.submit-button');
const loadButton = document.querySelector('.load-button');
let formTextValue = formText.value.trim().toLowerCase();
let num = 1;
let newNum;
let heightStatsItem;

formSearch.addEventListener('submit', async event => {
  event.preventDefault();
  num = 1;

  formTextValue = formText.value.trim().toLowerCase();
  if (!formTextValue) {
    formText.value = '';
    return iziToast.info({
      message: 'Please enter the query parameters',
      messageColor: '#FAFAFB',
      closeOnEscape: true,
    });
  }

  showLoader();
  submitButton.disabled = true;

  clearGallery();

  try {
    const response = await getImagesByQuery(formTextValue);
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
    newNum = response.data.totalHits;
    if (newNum > num) {
      showLoadMoreButton();
      const galleryItem = document.querySelector('.gallery-item');
      heightStatsItem = galleryItem.getBoundingClientRect().height;
      console.log(heightStatsItem);
    }
  } catch (error) {
    iziToast.error({
      message: `${error}`,
      closeOnEscape: true,
    });
  } finally {
    hideLoader();
    submitButton.disabled = false;
    formText.value = '';
  }
});


loadButton.addEventListener('click', async event => {
  event.preventDefault();

  showLoader();

  num++;
  try {
    const response = await getImagesByQuery(formTextValue, num);
    createGallery(response.data.hits);
  } catch (error) {
    iziToast.error({
      message: `${error}`,
      closeOnEscape: true,
    });
  } finally {
    hideLoader();
    window.scrollBy({
      top: (heightStatsItem * 2),
      behavior: 'smooth',
    });
    if (newNum <= num) {
      hideLoadMoreButton();
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        closeOnEscape: true,
      });
    }
  }
});
