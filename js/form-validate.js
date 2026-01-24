import { closeForm } from './form.js';
import { sendData } from './server.js';
import { showSuccess,showError} from './form-message.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i ;

// Переменная для вывода ошибок

const ErrorMessage = {
  INVALID: 'введен невалидный хэштег',
  COUNT: 'превышено количество хэштегов',
  REPEAT: 'хэштеги повторяются',
  COMMENTS : 'ошибка здесь'
};

const STEP = 25; // шаг изменения в процентах
const MIN_VALUE = 25; // минимальное значение %
const MAX_VALUE = 100; // максимальное значение %

const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const textFormDescription = document.querySelector('.text__description');
const imgEffect = document.querySelector('.img-upload__preview img');
const onClickSmaller = document.querySelector('.scale__control--smaller');
const onClickBigger = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');

// Функция для сброса масштаба

const resetImgScale = () => {
  imgEffect.style.transform = 'scale(1)';
  scaleControl.value = '100%';
};


// Функция для изменение размера 100%

function sizePhoto() {
  const value = parseInt(scaleControl.value, 10);
  const scaleNumber = value / 100;
  imgEffect.style.transform = `scale(${scaleNumber})`;
}

// Обработчик для кнопки минус

const smaller = () => {
  let currentValue = parseInt(scaleControl.value, 10);
  if (currentValue > MIN_VALUE) {
    currentValue -= STEP;
    scaleControl.value = `${currentValue}%`;
    sizePhoto();
  }
};

// Обработчик для кнопки плюс

const bigger = () => {
  let currentValue = parseInt(scaleControl.value, 10);
  if (currentValue < MAX_VALUE) {
    currentValue += STEP;
    scaleControl.value = `${currentValue}%`;
    sizePhoto();
  }
};

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const getHashtags = (value) => value.trim().split(' ').filter((item) => !!item);

const isValidHashtags = (value) => {
  const hashtags = getHashtags(value);
  return hashtags.every(((item) => HASHTAG_REGEX.test(item)));
};

const isValidCountHashtags = (value) => getHashtags(value).length <= 5;

const isUniqueHashtags = (value) => {
  const hashtags = getHashtags(value).map((item) => item.toLowerCase());
  return hashtags.length === (new Set(hashtags)).size;
};

// Функция для комментариев 140

const isValidComment = (value) => {
  const textLength = textFormDescription.value;
  if(textLength){
    return value.length <= 140;
  }
  return true;
};

pristine.addValidator(hashtagsInput,isValidHashtags, ErrorMessage.INVALID);
pristine.addValidator(hashtagsInput,isValidCountHashtags, ErrorMessage.COUNT);
pristine.addValidator(hashtagsInput,isUniqueHashtags, ErrorMessage.REPEAT);
pristine.addValidator(textFormDescription, isValidComment ,ErrorMessage.COMMENTS);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(pristine.validate()){
    sendData(new FormData(evt.target))
      .then(() => {
        showSuccess();
        closeForm();
      })
      .catch(() => {
        showError();
      });
  }
});

const resetValidate = () => pristine.reset();

// Обработчики для масштаба изоображение в форме

onClickSmaller.addEventListener('click', smaller);
onClickBigger.addEventListener('click', bigger);

export {resetValidate,resetImgScale};
