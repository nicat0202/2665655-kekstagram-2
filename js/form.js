

const uploadInput = document.querySelector('.img-upload__input');
const form = document.querySelector('.img-upload__overlay');

const initForm = () =>{};
uploadInput.addEventListener('change', () =>{
  form.classList.remove('hidden');
  document.body.addEventListener('modal-open');
});

const closeForm = () =>{
  form.classList.add('hidden');
  document.body.addEventListener.remove('modal-open');
};

export {initForm, closeForm};
