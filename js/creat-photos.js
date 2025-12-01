import { NAMES,MESSAGES } from "./data.js";
import {getRandomNumber,createIdGenerator,getRandomItem} from "./util.js";


const MIN_likes = 15;
const MAX_likes = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 200;

const getId = createIdGenerator();

// Создаёт массив комментариев для одной фотографии

const createComments = () => {
  const comments = [];

  for(let i = 0; i <= getRandomNumber(MIN_COMMENTS, MAX_COMMENTS); i++) {
    const comment = {
      id: getId(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: getRandomItem(MESSAGES),
      name: getRandomItem(NAMES)
    };
    comments.push(comment);
  }
  return comments;
};


// Создаёт список фотографий

const createPhotos = () => {
  const photos = [];

  for(let i = 1; i <= 25; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: 'Перед нами интересная, необычная фотография.',
      likes: getRandomNumber(MIN_likes, MAX_likes),
      comments: createComments()
    };
    photos.push(photo);
  }
  return photos;

};


export {createPhotos};
