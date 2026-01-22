const sliderElement = document.querySelector('.effect-level__slider');
const sliderBox = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.img-upload__effects');
const previewImage = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.effect-level__value');

let currentEffect = 'none';

// Параметры слайдера

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderBox.classList.add('hidden');

//  Обработчик для слайдера

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  effectLevel.value = value;

  // Условии для картинок

  if (currentEffect === 'chrome') {
    previewImage.style.filter = `grayscale(${value})`;
  } else if (currentEffect === 'sepia') {
    previewImage.style.filter = `sepia(${value})`;
  } else if (currentEffect === 'marvin') {
    previewImage.style.filter = `invert(${value}%)`;
  } else if (currentEffect === 'phobos') {
    previewImage.style.filter = `blur(${value}px)`;
  } else if (currentEffect === 'heat') {
    previewImage.style.filter = `brightness(${value})`;
  } else {
    previewImage.style.filter = '';
  }
});

// Обработчик для эффекта слайдера

effectsList.addEventListener('change', (evt) => {
  currentEffect = evt.target.value;

  // Параметры эффекта для каждой картинки

  if (currentEffect === 'none') {
    sliderBox.classList.add('hidden');
    previewImage.style.filter = '';
  } else {
    sliderBox.classList.remove('hidden');
    if (currentEffect === 'chrome' || currentEffect === 'sepia') {
      sliderElement.noUiSlider.updateOptions({
        range:
        { min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      });
    } else if (currentEffect === 'marvin') {
      sliderElement.noUiSlider.updateOptions({
        range:
        { min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    } else if (currentEffect === 'phobos') {
      sliderElement.noUiSlider.updateOptions({
        range:
        { min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    } else if (currentEffect === 'heat') {
      sliderElement.noUiSlider.updateOptions({
        range:
        { min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    }
  }
});
