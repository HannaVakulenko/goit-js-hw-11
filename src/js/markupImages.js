export const markupImages = photos => {
  return photos
    .map(
      ({
        tags, // tags - рядок з описом зображення. Підійде для атрибуту alt.
        webformatURL, // webformatURL - посилання на маленьке зображення для списку карток.
        largeImageURL, // largeImageURL - посилання на велике зображення.
        likes, // likes - кількість лайків.
        views, // views - кількість переглядів.
        comments, // comments - кількість коментарів.
        downloads, // downloads - кількість завантажень.
      }) => {
        return /*html*/ `
          <a href='${largeImageURL}' class="card-link">
            <div class="photo-card">
            <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${downloads}
            </p>
            </div>
            </div>
          </a>`;
      }
    )
    .join('');
};
