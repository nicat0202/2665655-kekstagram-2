import { renderMiniatures } from './thumbails.js';
import { initForm } from './form.js';
import './form-effects.js';
import { getData } from './server.js';
import { showError } from './form-message.js';
import { initFilters } from './filters-img.js';
import { initUploadFile } from './avatar.js';

getData()
  .then((photos) => {
    renderMiniatures(photos);
    initFilters(photos);
  })
  .catch(() => {
    showError();
  });

initForm();
initUploadFile();
