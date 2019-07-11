import {imageURL} from '../utils.js';
import store from '../store/index.js';
import MovieDetails from './moviedetails.js';

export default class Movies {
  constructor() {
    store.pubsub.subscribe('moviesUpdated', () => this.render());
    store.pubsub.subscribe('moviesLoading', () => this.startSpinner());
    this.element = document.querySelector('[data-js=movie-list]');
    this.movies = [];
  }
  render() {
    this.movies = store.state.searchMode ? store.state.search.movies: store.state.inTheaters.movies;
    if (this.movies.length === 0) {
      this.element.innerHTML = '<div class="no-result">No movies found for this query...</div>';
    } else  {
      this._updateMovieList();
    }
    if (!store.state.searchMode) {
      // Reinitialize search input - useful when home link is clicked
      document.querySelector('[data-js=title]').value = '';
    }
    this.stopSpinner();
  }
  startSpinner() {
    if (store.state.loadingMore) {
      this.element.insertAdjacentHTML('afterend','<div class="loading"><div class="loader"></div></div>');
    } else {
      this.element.innerHTML = '';
      this.element.insertAdjacentHTML('beforebegin','<div class="loading"><div class="loader"></div></div>');
    }
  }

  stopSpinner() {
    const loading = document.querySelector('.loading');
    loading && loading.remove();
  }

  async _updateMovieList() {
    const genres = await store.getGenres();
    this.element.innerHTML = this.movies.map(movie => this._addMovieToList(movie, genres)).join('');
    this.movies.forEach(movie => new MovieDetails(movie.id));
  }

  _addMovieToList(movie, genres) {
    return `
      <div class="movie" data-js="movie-${movie.id}">
        <img class="movie__img" src=${movie.poster_path ? imageURL(movie.poster_path): 'http://placehold.it/200x300'} alt="Movie cover">
        <div class="movie__information" data-js="movie-info">
          <strong class="movie__title">${movie.title}<span class="movie__release-year"> (${movie.release_date ? movie.release_date.substr(0,4): 'Unknown date'})</span></strong>
          <div class="movie__genres">${movie.genre_ids ? movie.genre_ids.map(id => `<span class="movie__genre">${genres[id]}</span>`).join(' | '): ''}</div>
          <div class="movie__vote-line">Average vote: <span class="movie__vote">${movie.vote_average}</span></div>
          <div class="movie__overview">${movie.overview}</div>
          <button class="expand" aria-label="More details">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="48" width="48" fill="#333" class="expand__icon" aria-hidden="true"><path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/></svg>
          </button>
          <div data-js="details" class="movie__details scale-animation-end d-none">
          </div>
          <button class="minimize d-none" aria-label="Hide details">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" height="48" width="48" fill="#333" class="minimize__icon" aria-hidden="true"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z"/></svg>
          </button>
        </div>
      </div>
    `;
  }
}
