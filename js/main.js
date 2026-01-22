import { renderMiniatures } from './thumbails.js';
import { initForm } from './form.js';
import './form-effects.js';
import { getData } from './server.js';
import { showError } from './form-message.js';

getData()
  .then((photos) => {
    renderMiniatures(photos);
  })
  .catch(() => {
    showError();
  });

initForm();
