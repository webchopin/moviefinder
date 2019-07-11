import controller from '../controller/index.js';
import store from '../store/index.js';

export default class MovieDetails {
  constructor(id) {
    store.pubsub.subscribe('movieDetailsUpdated', (data) => this.render(data));
    store.pubsub.subscribe('movieDetailsLoading', (data) => this.startSpinner(data));
    this.element = document.querySelector(`[data-js=movie-${id}] [data-js=details]`);
    this.id = id;

    this.expand = document.querySelector(`[data-js=movie-${id}] .expand`);
    this.minimize = document.querySelector(`[data-js=movie-${id}] .minimize`);
    this._initClickListeners();
  }

  _initClickListeners() {
    this.expand.addEventListener('click', () => {
      if (this.element.childElementCount === 0) {
        // Load content and show spinner before loading
        controller.loadMovieDetails(this.id);
      } else {
        // Show animation when expand is used again after details are loaded
        this._showAnimation();
      }
    });

    this.minimize.addEventListener('click', () => {
      this._hideAnimation();
    });
  }

  render(movie) {
    if (this.id != movie.id) return;
    this.element.classList.add('d-none');
    const video = this._addVideoToDetails(movie.video);
    const reviews = this._addReviewsToDetails(movie.reviews);
    const similarMovies = this._addSimilarMoviesToDetails(movie.similar);
    this.element.innerHTML = `
      <div class="video">${video}</div>
      <div class="reviews">
        <div class="reviews__header">What people say about this movie:</div>
        ${reviews}
      </div>
      <div class="similar-movies">
        <div class="similar-movies__header">You might also like:</div>
        ${similarMovies}
      </div>
    `;

    this._showAnimation();
  }
  startSpinner(movieId) {
    if (this.id != movieId) return;
    this.element.classList.remove('d-none');
    this.element.innerHTML = `
      <div class="loading">
        <div class="loader"></div>
      </div>
    `;
  }
  _addVideoToDetails(video) {
    if (video.site === 'YouTube') {
      return `
        <div class="video__title">
          ${video.name}
        </div>
        <iframe
         class="video__player"
         width="560"
         height="315"
         src="https://www.youtube.com/embed/${video.key}"
         frameborder="0"
         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
         allowfullscreen>
         </iframe>
      `
    }
    return 'No video to show';
  }
  _addReviewsToDetails(reviews) {
    return reviews.length ? reviews.map(review => {
      return `
        <div class="review">
          <div class="review__byauthor">
            <span>by </span>
            <span class="review__byauthor">
              ${review.author}
            </span>
            <span>:</span>
          </div>
          <blockquote class="review__text">
            ${review.content}
          </blockquote>
        </div>
      `
    }).join(''): 'No reviews found';
  }
  _addSimilarMoviesToDetails(similarMovies) {
    return `
      <div class="similar-movies__text">
        ${similarMovies.length ? similarMovies.map(movie => movie.title).join(' | '): 'No similar movies found'}
      </div>
    `;
  }
  _showAnimation() {
    // Make details div visible
    this.element.classList.remove('d-none');
    // Then, add a little delay to make sure the animation will work
    setTimeout(() => {
      this.expand.classList.add('d-none');
      this.minimize.classList.remove('d-none');
      this.element.classList.remove('scale-animation-end');
      this.element.classList.add('scale-animation-begin');
    }, 10);
  }
  _hideAnimation() {
    this.element.classList.add('scale-animation-end');
    this.element.classList.remove('scale-animation-begin');
    this.expand.classList.remove('d-none');
    this.minimize.classList.add('d-none');
    // Wait for the animation to end before hiding the div
    setTimeout(() => {
      this.element.classList.add('d-none');
      this.element.parentNode.scrollIntoView({behavior: 'smooth'});
    }, 300);
  }
}
