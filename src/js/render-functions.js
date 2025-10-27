import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;
  
  const insertion = images
    .map(
      image =>
        `<li class="gallery-item">
       <figure class="gallery-figure">
  <a class="gallery-link" href="${image.largeImageURL}">
    <img
      class="gallery-image"
      src="${image.webformatURL}"
      alt="${image.tags}"
    />
  </a>
   <figcaption class="gallery-info">
      <ul class="gallery-stats">
        <li class='stats-item'><span class='social-info'>Likes</span> <span>${image.likes}</span> </li>
        <li class='stats-item'><span class='social-info'>Views</span> <span>${image.views}</span></li>
        <li class='stats-item'><span class='social-info'>Comments</span> <span>${image.comments}</span></li>
        <li class='stats-item'><span class='social-info'>Downloads</span> <span>${image.downloads}</span></li>
      </ul>
    </figcaption>
   </figure>
</li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', insertion);
  lightbox.refresh();  
}  

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;
  gallery.innerHTML = '';
  lightbox.refresh();
}


export function showLoader() {
  const load = document.querySelector('.loader');
  load.hidden = false;
  load.classList.add('load');
}

export function hideLoader() {
  const load = document.querySelector('.loader');
  load.hidden = true;
  load.classList.remove('load');
}

export function showLoadMoreButton() {
  const loadButton = document.querySelector('.load-button');
  loadButton.hidden = false;
}

export function hideLoadMoreButton() {
  const loadButton = document.querySelector('.load-button');
  loadButton.hidden = true;
}