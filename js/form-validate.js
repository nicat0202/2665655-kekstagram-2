import { handleCancelClick } from './form.js';
import { sendData } from './server.js';
import { showSuccess,showError} from './form-message.js';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const textFormDescription = document.querySelector('.text__description');
const imgEffect = document.querySelector('.img-upload__preview img');
const onClickSmaller = document.querySelector('.scale__control--smaller');
const onClickBigger = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');
const submitFormBtn = form.querySelector('.img-upload__submit');

const ErrorMessage = {
  INVALID: 'введен невалидный хэштег',
  COUNT: 'превышено количество хэштегов',
  REPEAT: 'хэштеги повторяются',
  COMMENTS : 'ошибка здесь'
};

const STEP = 25; // шаг изменения в процентах
const MIN_VALUE = 25; // минимальное значение %
const MAX_VALUE = 100; // максимальное значение %

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i ;

// Функция для сброса масштаба

const resetImgScale = () => {
  imgEffect.style.transform = 'scale(1)';
  scaleControl.value = '100%';
};

// Функция для изменение размера 100%

function changePicture() {
  const value = parseInt(scaleControl.value, 10);
  const scaleNumber = value / 100;
  imgEffect.style.transform = `scale(${scaleNumber})`;
}

// Обработчик для кнопки минус

const handleSmallerClick = () => {
  let currentValue = parseInt(scaleControl.value, 10);
  if (currentValue > MIN_VALUE) {
    currentValue -= STEP;
    scaleControl.value = `${currentValue}%`;
    changePicture();
  }
};

// Обработчик для кнопки плюс

const handleBiggerClick = () => {
  let currentValue = parseInt(scaleControl.value, 10);
  if (currentValue < MAX_VALUE) {
    currentValue += STEP;
    scaleControl.value = `${currentValue}%`;
    changePicture();
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

const isValidComment = (value) => value.length <= 140;

// Событие при наведение не срабатывает кнопка ESC

hashtagsInput.addEventListener('keydown',(evt) => {
  evt.stopPropagation();
});

textFormDescription.addEventListener('keydown',(evt) => {
  evt.stopPropagation();
});

pristine.addValidator(hashtagsInput,isValidHashtags, ErrorMessage.INVALID);
pristine.addValidator(hashtagsInput,isValidCountHashtags, ErrorMessage.COUNT);
pristine.addValidator(hashtagsInput,isUniqueHashtags, ErrorMessage.REPEAT);
pristine.addValidator(textFormDescription, isValidComment ,ErrorMessage.COMMENTS);

// Cобытия для отправки формы - кнопка 'Опубликовать'

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if(pristine.validate()){
    submitFormBtn.disabled = true;
    sendData(new FormData(evt.target))
      .then(() => {
        showSuccess();
        handleCancelClick();
      })
      .catch(() => {
        showError();
      })
      .finally(() => {
        submitFormBtn.disabled = false;
      });
  }
});

const resetValidate = () => pristine.reset();

document.addEventListener('click', (evt) => {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    evt.stopPropagation();
  }
});

// Обработчики для масштаба изоображение в форме

onClickSmaller.addEventListener('click', handleSmallerClick);
onClickBigger.addEventListener('click', handleBiggerClick);

export {resetValidate,resetImgScale};
