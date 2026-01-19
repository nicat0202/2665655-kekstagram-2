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

const form = document.querySelector('.img-upload__overlay');
const hashtagsInput = form.querySelector('.text__hashtags');
const textFormDescription = document.querySelector('.text__description');
const imgEffect = document.querySelector('.img-upload__preview img');
const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const scaleControl = document.querySelector('.scale__control--value');


// Функция для изменение размера 100%

function image() {
  const value = parseInt(scaleControl.value, 10);
  const scaleNumber = value / 100;
  imgEffect.style.transform = `scale(${scaleNumber})`;
}

// Обработчик для кнопки -

const smaller = () => {
  let currentValue = parseInt(scaleControl.value, 10);
  if (currentValue > MIN_VALUE) {
    currentValue -= STEP;
    scaleControl.value = `${currentValue}%`;
    image();
  }
};

// Обработчик для кнопки +

const bigger = () => {
  let currentValue = parseInt(scaleControl.value, 10);
  if (currentValue < MAX_VALUE) {
    currentValue += STEP;
    scaleControl.value = `${currentValue}%`;
    image();
  }
};


const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});


// Переменная для ошибок хэштега

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


form.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  pristine.validate();
});


const resetValidate = () => pristine.reset();

// Обработчики для масштаба изоображение в форме

smallerBtn.addEventListener('click', smaller);
biggerBtn.addEventListener('click', bigger);

export {resetValidate};
