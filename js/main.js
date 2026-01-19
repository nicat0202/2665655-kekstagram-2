import { createPhotos } from './create-photos';
import './thumbails';
import { renderMiniatures } from './thumbails';
import { initForm } from './form';
import './form-effects.js';

initForm();

const photos = createPhotos();
renderMiniatures(photos);
