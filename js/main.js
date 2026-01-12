import { createPhotos } from './create-photos';
import './thumbails';
import { renderMiniatures } from './thumbails';
import { initForm } from './form';
import './form-validate';

initForm();

const photos = createPhotos();
renderMiniatures(photos);
