import { resetValidate,resetImgScale } from './form-validate.js';
import { resetEffects } from './form-effects.js';

const uploadInput = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const onCancelButton = formOverlay.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');

const onCancelButtonClick = () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  resetValidate();
  resetImgScale();
  resetEffects();
  document.removeEventListener('keydown', onCancelButton);
};

const initForm = () => {
  uploadInput.addEventListener('change', () => {
    formOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
  });
  onCancelButton.addEventListener('click', onCancelButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const isEscape = (evt) => evt.key === 'Escape';

uploadInput.addEventListener('change', () => {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});


function onDocumentKeydown (evt) {
  if(isEscape(evt) && !document.querySelector('.error')){
    onCancelButtonClick();
  }
}

// Кнопка событие для закрытие формы

onCancelButton.addEventListener('click', onCancelButtonClick);
document.addEventListener('keydown', onDocumentKeydown);

export {onCancelButtonClick,initForm};
