// const options = {
//   root: null,
//   rootMargin: '100px',
//   threshold: 1.0,
// };

// // Функція завантаження зображень
// const loadMoreImages = async (entries, observer) => {
//   entries.forEach(async entry => {
//     if (entry.isIntersecting) {
//       observer.unobserve(entry.target);
//       pixabay.incrementPage();

//       try {
//         const { hits } = await pixabay.getPhotos();
//         renderMarkup(hits);

//         if (pixabay.hasMorePhotos) {
//           // const lastCard = document.querySelector('.gallery a:last-child');
//           observer.observe(refs.lastCard);
//         } else
//           Notify.info(
//             "We're sorry, but you've reached the end of search results."
//           );

//         simpleLightBox.refresh();
//       } catch (error) {
//         Notify.failure(error.message, 'Something went wrong!');
//         clearPage();
//       }
//     }
//   });
// };

// const observer = new IntersectionObserver(loadMoreImages, options);
