import { renderMiniatures } from './thumbnails.js';
import './form-effects.js';
import { getData } from './server.js';
import { initForm } from './form.js';
import { showTimeError } from './form-message.js';
import { initFilters } from './filters-img.js';
import { initUploadFile } from './photo-area.js';

getData()
  .then((photos) => {
    renderMiniatures(photos);
    initFilters(photos);
  })
  .catch(() => {
    showTimeError();
  });
initForm();

initUploadFile();
