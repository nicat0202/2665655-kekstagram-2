const errorTemplate = document.querySelector('#data-error').content.querySelector('.data-error'); // Не удалось загрузить данные
const errorBtnRepeat = document.querySelector('#error').content.querySelector('.error-button'); // Попробовать ещё раз
const successTemplate = document.querySelector('#success').content.querySelector('.success'); // Изображение успешно загружено
const coolButton = document.querySelector('.success__button'); // Кнопка <Круто!>
const body = document.querySelector('body');

// Попробовать ещё раз

const showErrorRepeat = () => {
  const errorBtnMessage = errorBtnRepeat.cloneNode(true);
  body.appendChild(errorBtnMessage);
};

// Не удалось загрузить данные

const showError = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  body.appendChild(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  },5000);
};

// Изображение успешно загружено

const showSuccess = () => {
  const successMessage = successTemplate.cloneNode(true);
  body.appendChild(successMessage);
  if(successMessage){
    return showErrorRepeat();
  }
};

export {showError, showSuccess, showErrorRepeat};
