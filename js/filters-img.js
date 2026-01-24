import { renderMiniatures } from './thumbails.js';
import { debounce } from './util.js';

const filtersImg = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const inactiveFiltersButtons = () => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
};

const debounceRenderMiniatures = debounce(renderMiniatures);


const showFilters = () => {
  filtersImg.classList.remove('img-filters--inactive');
};

const getDiscussedPhotos = (photos) => photos.slice().sort((a,b) => b.comments.length - a.comments.length);

const getRandomPhotos = (photos) => photos.slice(0,10);

const initFilters = (photos) => {
  showFilters();
  filterButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      inactiveFiltersButtons();
      evt.target.classList.add('img-filters__button--active');
      if(evt.target.id === 'filter-default'){
        debounceRenderMiniatures(photos);
      }else if(evt.target.id === 'filter-random'){
        debounceRenderMiniatures(getRandomPhotos(photos));
      }else if(evt.target.id === 'filter-discussed'){
        debounceRenderMiniatures(getDiscussedPhotos(photos));
      }
    });
  });
};


export{initFilters};
