import {createPhotos} from './creat-photos';

const template = document.querySelector('#picture').textContent.querySelector('.picture');
const container = document.querySelector('.pictures');

const fragment = document.createDocumentFragment();
const createImage = createPhotos();

createImage.forEach((photo) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');

  image.src = photo.url;
  image.alt = photo.description;

thumbnail.querySelector('.picture__likes').textContent = photo.likes;
thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;

fragment.appendChild(thumbnail);
});

container.appendChild(fragment);


