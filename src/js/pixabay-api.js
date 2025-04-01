'use strict';

export default function makeSearchRequest({
  key,
  q,
  type = 'photo',
  orientation = 'horizontal',
  safesearch = true,
}) {
  return fetch(
    'https://pixabay.com/api/?' +
      new URLSearchParams({
        key,
        q,
        image_type: type,
        orientation,
        safesearch,
      }).toString()
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`No results were found for ${q}`));
  });
}