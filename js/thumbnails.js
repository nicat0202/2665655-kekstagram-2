import { openBigPicture } from './big-picture.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const removeMiniatures = () => {
  const renderedPhotos = document.querySelectorAll('.picture');
  renderedPhotos.forEach((photo) => {
    photo.remove();
  });
};

const renderMiniatures = (photos) => {
  const fragment = document.createDocumentFragment();
  removeMiniatures();

  photos.forEach((photo) => {
    const thumbnail = template.cloneNode(true);
    const image = thumbnail.querySelector('.picture__img');

    image.src = photo.url;
    image.alt = photo.description;

    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

    thumbnail.addEventListener('click', () => {
      openBigPicture(photo);
    });
    fragment.appendChild(thumbnail);
  });
  container.appendChild(fragment);
};

export {renderMiniatures};
