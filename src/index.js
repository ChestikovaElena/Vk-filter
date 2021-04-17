import './scss/base.scss';
import './scss/style.scss';

import { getData } from './js/vk.js';
import { saveInLocalStorage } from './js/localStorage.js';

getData();
saveInLocalStorage();

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if (e.target === document.querySelector('[data-role="form-close"]')) {
      document.querySelector('.wrapper').style.display = 'none';
    };
  })
})