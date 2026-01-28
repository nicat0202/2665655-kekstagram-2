import { resetValidate,resetImgScale } from './form-validate.js';
import { resetEffects } from './form-effects.js';

const uploadInput = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const onCancelButton = formOverlay.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');

const handleCancelClick = () => {
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
  onCancelButton.addEventListener('click', handleCancelClick);
  document.addEventListener('keydown', handleDocumentKeydown);
};

const isEscape = (evt) => evt.key === 'Escape';

uploadInput.addEventListener('change', () => {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});


function handleDocumentKeydown (evt) {
  if(isEscape(evt) && !document.querySelector('.error')){
    handleCancelClick();
  }
}

// Кнопка событие для закрытие формы

onCancelButton.addEventListener('click', handleCancelClick);
document.addEventListener('keydown', handleDocumentKeydown);

export {handleCancelClick,initForm};
