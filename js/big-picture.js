import { initComments, clearComments} from './picture-comments.js';

const body = document.body;
const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const description = bigPicture.querySelector('.social__caption');

const cancelButton = bigPicture.querySelector('.big-picture__cancel');

const isEscape = (evt) => evt.key === 'Escape';

const onEscapeKeydown = (evt) => {
  if(isEscape(evt)){
    closeBigPicture();
  }
};

// Функция которая открываает фото

const openBigPicture = (photo) => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;

  likesCount.textContent = photo.likes;
  description.textContent = photo.description;
  document.addEventListener('keydown', onEscapeKeydown);

  clearComments();
  initComments(photo.comments);
};

// Функция для закрытие окна ESC

function closeBigPicture () {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  clearComments();
  bigPictureImage.src = '';
  bigPictureImage.alt = '';

  likesCount.textContent = '';
  description.textContent = '';
  document.removeEventListener('keydown', onEscapeKeydown);
}

cancelButton.addEventListener('click', () => {
  closeBigPicture();
});

export{openBigPicture};

