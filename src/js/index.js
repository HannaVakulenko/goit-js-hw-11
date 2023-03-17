import { Notify } from 'notiflix/build/notiflix-notify-aio'; // Імпорт бібліотеки notiflix для спливаючих повідомлень 'alert'
import SimpleLightbox from 'simplelightbox'; //Імпорт бібліотеки SimpleLightbox для відображення великої версії зображення
import 'simplelightbox/dist/simple-lightbox.min.css'; // Додатковий імпорт стилів бібліотеки SimpleLightbox

import { markupImages } from './markupImages';
import { PixabayAPI } from './PixabayAPI';
import { refs } from './refs';

refs.btnLoadMore.classList.add('visually-hidden'); //кнопка "Load more" на початку скрита

const pixabay = new PixabayAPI();

// екземпляр модального вікна слайдера-зображень
const simpleLightBox = new SimpleLightbox('.gallery a', {
  captionDelay: 250, // затримка 250 мілісекунд
});

//Функція очистки сторінки
const clearPage = () => {
  pixabay.resetPage();
  refs.gallery.innerHTML = '';
};

//Функція плавного прокручування сторінки
const scrollPage = () => {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

// Функція рендерингу розмітки галереї зображень
const renderMarkup = items => {
  const markup = markupImages(items);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
};

const onSubmitClick = async e => {
  e.preventDefault();

  const {
    elements: { searchQuery },
  } = e.target;

  const validSearchQuery = searchQuery.value.trim().toLowerCase();

  if (!validSearchQuery) {
    clearPage();
    Notify.info('Enter data to search!');
    return;
  }

  pixabay.query = validSearchQuery;

  clearPage();

  try {
    const { hits, total } = await pixabay.getPhotos();

    if (hits.length === 0) {
      Notify.failure(
        `Sorry, there are no images matching your search query: "${validSearchQuery}". Please try again.`
      );

      return;
    }

    if (hits.length < pixabay.per_page) {
      refs.btnLoadMore.classList.add('visually-hidden');
    }

    renderMarkup(hits);

    refs.btnLoadMore.classList.remove('visually-hidden'); //кнопка "Load more" стає видимою

    simpleLightBox.refresh(); // оновлення екземпляру lightbox

    pixabay.setTotal(total);
    Notify.success(`Hooray! We found ${total} images.`);
  } catch (error) {
    Notify.failure(error.message, 'Something went wrong!');
    clearPage();
  }
};

const onBtnLoadMore = async () => {
  pixabay.incrementPage();

  if (!pixabay.hasMorePhotos()) {
    refs.btnLoadMore.classList.add('visually-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  try {
    const { hits } = await pixabay.getPhotos();
    renderMarkup(hits);

    simpleLightBox.refresh(); // оновлення екземпляру lightbox
  } catch (error) {
    Notify.failure(error.message, 'Something went wrong!');

    clearPage();
  }
};

refs.searchForm.addEventListener('submit', onSubmitClick); // слухач події submit при кліку на кнопку Search
refs.btnLoadMore.addEventListener('click', onBtnLoadMore); // слухач події клік по кнопці load More
