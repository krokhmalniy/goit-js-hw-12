import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import { getImagesByQuery, per_page } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconOctagon from '../src/img/bi_x-octagon.svg';

const container = document.querySelector('.container');
const formSearch = document.querySelector('.form');
const formText = document.querySelector('.form-text');
const submitButton = document.querySelector('.submit-button');
const loadButton = document.querySelector('.load-button');
let formTextValue = formText.value.trim().toLowerCase();
let defaultPage = 1;
let totalPages;
let heightStatsItem;

formSearch.addEventListener('submit', async event => {
  event.preventDefault();

  formTextValue = formText.value.trim().toLowerCase();
  if (!formTextValue) {
    return iziToast.info({
      message: 'Please enter the query parameters',
      messageColor: '#FAFAFB',
      closeOnEscape: true,
    });
  }

  submitButton.disabled = true;
  hideLoadMoreButton();
  showLoader();
  clearGallery();
  defaultPage = 1;

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
    totalPages = Math.ceil(response.data.totalHits / per_page);
    if (defaultPage < totalPages) {
      showLoadMoreButton();
      const galleryItem = document.querySelector('.gallery-item');
      heightStatsItem = galleryItem.getBoundingClientRect().height;
    } else {
      hideLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: `${error}`,
      closeOnEscape: true,
    });
  } finally {
    hideLoader();
    submitButton.disabled = false;
  }
});

loadButton.addEventListener('click', async event => {
  event.preventDefault();
  hideLoadMoreButton();
  showLoader();

  defaultPage++;
  try {
    const response = await getImagesByQuery(formTextValue, defaultPage);
    createGallery(response.data.hits);
  } catch (error) {
    iziToast.error({
      message: `${error}`,
      closeOnEscape: true,
    });
  } finally {
    hideLoader();
    window.scrollBy({
      top: heightStatsItem * 2,
      behavior: 'smooth',
    });
    if (defaultPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        closeOnEscape: true,
      });
    } else {
      showLoadMoreButton();
    }
  }
});
