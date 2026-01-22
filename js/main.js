import { renderMiniatures } from './thumbails.js';
import { initForm } from './form.js';
import './form-effects.js';
import { getData } from './server.js';
import { showError } from './error-server.js';

getData()
  .then((photos) => {
    renderMiniatures(photos);
  })
  .catch(() => {
    showError();
  });

initForm();
