const NAMES =[
  `Игорь`,
  `Алина`,
  `Виктория`,
  `Венера`,
  `Максим`,
  `Иван`,
  `Шаиг`,
  `Афиг`,
  `Григорий`,
  `Джаваншир`
]


const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


const MIN_likes = 15;
const MAX_likes = 200;
const MAX_comments = 200;
const MIN_comments = 0;

// Возвращает случайное целое число

const getRandomNumber = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};


// Создаёт функцию, которая генерирует уникальные ID

const createIdGenerator = () => {
  let lastGenerateId = 0;

  return () => {
    lastGenerateId += 1;
    return lastGenerateId;
  };
};

const getId = createIdGenerator();

// Выбирает один случайный элемент из массива

const getRandomItem = (items) => items[getRandomNumber(0, items.length - 1)];


// Создаёт массив комментариев для одной фотографии

const createComments = () => {
  const comments = [];

  for(let i = 0; i <= getRandomNumber(MIN_COMMENTS, MAX_COMMENTS); i++) {
    const comment = {
      id: getId(),
      avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
      message: getRandomItem(MESSAGES_SET),
      name: getRandomItem(NAMES_SET)
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

createPhotos();
