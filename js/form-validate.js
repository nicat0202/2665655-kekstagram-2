const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i ;

const ErrorMessage = {
  INVALID: 'введен невалидный хэштег',
  COUNT: 'превышено количество хэштегов',
  REPEAT: 'хэштеги повторяются'
};

const form = document.querySelector('.img-upload__overlay');
const hashtagsInput = form.querySelector('.text__hashtags');

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent:'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const validateHashtags = (value) => {
  // console.log(value);
  return false ;
};

const getHashtags = (value) => value.trim().split(' ').filter((item) => !!item);

const isValidHashtags = (value) => {
  // console.log(getHashtags(value));
  return hashtags.every((item => HASHTAG_REGEX.test(item)));
};

const isValidCountHashtags = (value) => getHashtags(value).length <= 5;

const isUniqueHashtags = (value) => {
  const hashtags = getHashtags(value).map((item) => item.toLowerCase());
  return hashtags.length === (new Set(hashtags)).size;
};

pristine.addValidator(hashtagsInput,isValidHashtags, ErrorMessage.INVALID);
pristine.addValidator(hashtagsInput,isValidCountHashtags, ErrorMessage.COUNT);
pristine.addValidator(hashtagsInput,isUniqueHashtags, ErrorMessage.REPEAT);

form.addEventListener('submit', (evt) =>{
  evt.preventDefault();
  pristine.validate();
});

