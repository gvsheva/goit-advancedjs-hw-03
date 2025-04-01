'use strict';

import axios from 'axios';

export default function makeSearchRequest({
  key,
  q,
  type = 'photo',
  orientation = 'horizontal',
  safesearch = true,
}) {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key,
        q,
        image_type: type,
        orientation,
        safesearch,
      },
    })
    .then(response => {
      return response.data;
    });
}