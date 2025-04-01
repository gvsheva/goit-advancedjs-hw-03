'use strict';

import SimpleLightbox from 'simplelightbox';
import iziToast from 'izitoast';
import makeSearchRequest from './js/pixabay-api.js';
import renderItem from './js/render-functions.js';

const form = document.getElementById('searching-form');
const loader = document.getElementById('loader');
const gallery = document.getElementById('gallery');

const lightbox = new SimpleLightbox('.gallery-item > a', {
  captionsData: 'alt',
  captionDelay: 250,
});

form.addEventListener('submit', event => {
  event.preventDefault();
  gallery.innerHTML = '';

  if (form.elements.search.value === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  loader.classList.remove('is-hidden');

  const params = {
    key: '49622419-312bd19c735093b11668a437b',
    q: form.elements.search.value,
    orientation: form.elements.orientation.value,
    type: form.elements.type.value,
    sefesearch: form.elements.safesearch.value,
  };

  makeSearchRequest(params)
    .then(data => {
      const hits = data.hits;
      if (hits.length === 0) {
        iziToast.info({
          title: 'Info',
          message: 'No images found!',
        });
        return;
      }
      hits.forEach(item => {
        gallery.insertAdjacentHTML('beforeend', renderItem(item));
      });
      lightbox.refresh();
    })
    .catch(err => {
      console.log(err);
      iziToast.error({
        title: 'Error',
        message: err,
      });
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
});