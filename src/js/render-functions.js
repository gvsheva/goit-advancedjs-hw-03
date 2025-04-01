'use strict';

export default function renderItem({ largeImageURL, webformatURL, tags }) {
  return `<li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
          </a>
        </li>`;
}