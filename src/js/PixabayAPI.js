import axios from 'axios'; //Імпорт бібліотеки axios для HTTP-запитів

axios.defaults.baseURL = 'https://pixabay.com/api/'; //axios.defaults.baseURL - глобальні значення за замовчуванням для axios

const API_KEY = '34428593-ad2724277a9b2d94ab0c98dab'; // мій персональний ключ з Pixabay API
// Приклад URL-запиту з бібліотеки https://pixabay.com/api/?key=34428593-ad2724277a9b2d94ab0c98dab&q=yellow+flowers&image_type=photo

export class PixabayAPI {
  #page = 1; // початкове значення параметра page повинно бути 1 сторінкака
  #per_page = 40;
  #query = '';
  #totalPages = 0;

  async getPhotos() {
    const params = {
      q: this.#query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.#page,
      per_page: this.#per_page,
    };

    const urlForAxios = `?key=${API_KEY}`;

    const { data } = await axios.get(urlForAxios, { params });
    return data;
  }

  get query() {
    this.#query;
  }

  set query(newQuery) {
    this.#query = newQuery;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  setTotal(total) {
    this.#totalPages = total;
  }

  hasMorePhotos() {
    return this.#page < Math.ceil(this.#totalPages / this.#per_page);
  }
}
// У відповіді буде масив зображень, що задовольнили критерії параметрів запиту. Кожне зображення описується об'єктом.
