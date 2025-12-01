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

export {getRandomNumber,createIdGenerator,getRandomItem};
