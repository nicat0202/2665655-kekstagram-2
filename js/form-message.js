const errorTemplateData = document.querySelector('#data-error').content.querySelector('.data-error'); // Не удалось загрузить данные
const errorTemplate = document.querySelector('#error').content.querySelector('.error'); // Ошибка загрузки файла
const successTemplate = document.querySelector('#success').content.querySelector('.success'); // Изображение успешно загружено

// Попробовать ещё раз
const body = document.querySelector('body');

const isEscape = (evt) => evt.key === 'Escape';


// Функция для ошибки с интервалом 5 сек

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
    document.removeEventListener('keydown', onKeydownClick);
  };
  successMessage.querySelector('.success__button').addEventListener('click',() => {
    closeSuccess();
  });

  successMessage.addEventListener('click', () => {
    if(successMessage.classList.contains('success')){
      closeSuccess();
    }
  });
  function onKeydownClick(evt) {
    if(isEscape(evt)){
      closeSuccess();
    }
  }

  document.addEventListener('keydown', onKeydownClick);
};

// Изоображение загружено с ошибкой

const showError = () => {
  const errorMessage = errorTemplate.cloneNode('true');
  body.appendChild(errorMessage);
  const closeError = () => {
    errorMessage.remove();
    document.removeEventListener('keydown', onKeydownClickError);
  };
  errorMessage.querySelector('.error__button').addEventListener('click', () => {
    closeError();
  });
  errorMessage.addEventListener('click', () => {
    if(errorMessage.classList.contains('error')){
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

export { showSuccess,showError};
