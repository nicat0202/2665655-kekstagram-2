const body = document.body;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('big-picture__img img');

const likesCount = bigPicture.querySelector('.likes-count');
const description = bigPicture.querySelector('.social__caption');
const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = bigPicture.querySelector('.social__comment');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

const isEscape = (evt) => evt.key === 'Escape';


// Функция которая открываает фото

const openBigPicture = (photo) => {
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  bigPictureImage.src = photo.url;
  bigPictureImage.alt = photo.description;

  likesCount.textContent = photo.likes;
  description.textContent = photo.description;
  commentTotalCount.textContent = photo.comments.length;

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.addEventListener('keydown', onEscapeKeydown);

  socialComments.innerHTML = '';
  renderComments(photo.comments);

  console.log(socialComments);
};


// Функция которая создает комментарии

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentTemplate = socialComment.cloneNode(true);
    const commentAuthor = commentTemplate.querySelector('.social__picture');
    commentAuthor.src = comment.avatar;
    commentAuthor.alt = comment.name;
    fragment.appendChild(commentTemplate);
  });
  socialComments.appendChild(fragment);
};

// Кнопка для закрытие окна ESC

function closeBigPicture () {
  body.classList.remove('hidden');
  bigPicture.classList.add('hidden');

  socialComments.innerHTML = '';

  bigPictureImage.src = '';
  bigPictureImage.alt = '';

  likesCount.textContent = '';
  description.textContent = '';
  commentTotalCount.textContent = '';
  document.removeEventListener('keydown', onEscapeKeydown);
};

const onEscapeKeydown = (evt) => {
  if(isEscape(evt)){
    closeBigPicture();
  }
};

cancelButton.addEventListener('click', () => {
  closeBigPicture();
});

export{openBigPicture};
