const errorTemplateData = document.querySelector('#data-error').content.querySelector('.data-error'); // Не удалось загрузить данные
const errorTemplate = document.querySelector('#error').content.querySelector('.error'); // Ошибка загрузки файла
const successTemplate = document.querySelector('#success').content.querySelector('.success'); // Изображение успешно загружено

const body = document.querySelector('body');

const isEscape = (evt) => evt.key === 'Escape';

// Функция для ошибки с таймером 5 сек

const showTimeError = () => {
  const errorMessageTime = errorTemplateData.cloneNode(true);
  body.appendChild(errorMessageTime);
  setTimeout(() => {
    errorMessageTime.remove();
  },5000);
};

// Изображение успешно загружено

const showSuccess = () => {
  const successMessage = successTemplate.cloneNode(true);
  body.appendChild(successMessage);

  const closeSuccess = () => {
    successMessage.remove();
    document.removeEventListener('keydown', onKeydownClickError);
  };

  successMessage.querySelector('.success__button').addEventListener('click',() => {
    closeSuccess();
  });

  successMessage.addEventListener('click', () => {
    if(successMessage.classList.contains('success')){
      closeSuccess();
    }
  });

  function onKeydownClickError(evt) {
    if(isEscape(evt)){
      closeSuccess();
    }
  }
  document.addEventListener('keydown', onKeydownClickError);
};

// Изоображение загружено с ошибкой

const showError = () => {
  const errorMessage = errorTemplate.cloneNode('true');
  body.appendChild(errorMessage);

  const closeError = (evt) => {
    evt.target.remove();
    document.removeEventListener('keydown', onKeydownClickError);
  };
  errorMessage.querySelector('.error__button').addEventListener('click', () => {
    closeError();
  });
  errorMessage.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('error')){
      closeError();
    }
  });

  function onKeydownClickError(evt) {
    if(isEscape(evt)){
      closeError();
    }
  }
  document.addEventListener('keydown', onKeydownClickError);
};

export { showSuccess, showError, showTimeError};
