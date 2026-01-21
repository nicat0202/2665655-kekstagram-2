import './thumbails';
import { renderMiniatures } from './thumbails';
import { initForm } from './form';
import './form-effects.js';
import { getData } from './server.js';

getData()
  .then((photos) => {
    renderMiniatures(photos);
    // console.log(photos);
  });
initForm();
