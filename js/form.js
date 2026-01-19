import { resetValidate } from './form-validate';

const uploadInput = document.querySelector('.img-upload__input');
const formOverlay = document.querySelector('.img-upload__overlay');
const cancelButton = formOverlay.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');

const initForm = () => {};

uploadInput.addEventListener('change', () => {
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

const closeForm = () => {
  formOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  resetValidate();
};

// Кнопка событие для закрытие формы
cancelButton.addEventListener('click', closeForm);

export {initForm, closeForm};
