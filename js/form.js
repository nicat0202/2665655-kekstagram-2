import { resetValidate,resetImgScale } from './form-validate.js';

const uploadInput = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const onCancelButton = formOverlay.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');

const initForm = () => {};

const isEscape = (evt) => evt.key === 'Escape';

uploadInput.addEventListener('change', () => {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

const closeForm = () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  resetValidate();
  resetImgScale();
  document.removeEventListener('keydown', onCancelButton);
};

function onDocumentEscape (evt) {
  if(isEscape(evt) && !document.querySelector('.error')){
    closeForm();
  }
}

// Кнопка событие для закрытие формы

onCancelButton.addEventListener('click', closeForm);
document.addEventListener('keydown', onDocumentEscape);

export {initForm, closeForm};
