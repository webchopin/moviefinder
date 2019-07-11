import {fetchApi} from '../utils.js';
import store from '../store/index.js';
import * as settings from '../settings.json';

export default class Controller {
  constructor(api) {
    this.api = api;
  }
  async loadGenres() {
    let genres = {};
    const res = await fetchApi(this.api.genres());
    if (res && res.genres) {
      genres = res.genres.reduce((result, {id,name}) => {
        result[id] = name;
        return result;
      }, {});
      localStorage.setItem('genres', JSON.stringify(genres));
      store.state.genres = genres;
    } else {
      console.error('No genres');
    }
    return genres;
  }
  async loadMovies() {
    store.pubsub.publish('moviesLoading');
    const moviesJson = await fetchApi(store.state.searchInput ? this.api.search(store.state.searchInput, store.state.search.currentPage): this.api.inTheaters(store.state.inTheaters.currentPage));
    if (store.state.searchInput) {
      store.state.search.movies.push(...moviesJson.results);
    } else {
      store.state.inTheaters.movies.push(...moviesJson.results);
    }
    store.pubsub.publish('moviesUpdated');
    // Loading more and searching for a new movie at the same time might cause issues.
    // The lock is not used when searching for movies, it might be used there but it would need further reflexion.
    store.state.loadLocked = false; // eslint-disable-line require-atomic-updates
  }
  loadMore() {
    // Avoid multiple loads when scrolling to the bottom
    if (!store.state.loadLocked) {
      store.state.loadingMore = true;
      store.state.loadLocked = true;
      store.state.searchMode ? store.state.search.currentPage++ : store.state.inTheaters.currentPage++;
      this.loadMovies();
    }
  }
  searchMovies(userInput) {
    if (!userInput) { // From non-empty to empty
      this.switchToInTheathers();
    } else {
      store.state.loadingMore = false;
      store.initSearchState();
      // Make sure there are no concurrent searches
      clearTimeout(store.state.searchTimer);
      store.state.searchTimer = setTimeout(() => {
        store.state.searchInput = userInput;
        this.loadMovies();
      },settings.search_delay);
    }
  }
  switchToInTheathers() {
    store.state.loadingMore = false;
    // No API call is triggered as we keep inTheaters in our store state
    // -> we could comment the next line
    store.pubsub.publish('moviesLoading');
    store.initSearchState();
    store.state.searchInput = '';
    store.state.searchMode = false;
    store.pubsub.publish('moviesUpdated');
  }

  async loadMovieDetails(id) {
    store.pubsub.publish('movieDetailsLoading', id);
    let details = {id};
    // If any video, taking the first one
    const videos = await fetchApi(this.api.movieVideos(id));
    details.video = videos.results && videos.results.length ? videos.results[0]: {};
    // Taking up to 2 reviews
    const reviews = await fetchApi(this.api.movieReviews(id));
    details.reviews = reviews.results ? reviews.results.slice(0,2) : [];
    // Taking up to 4 similar movies
    const similar = await fetchApi(this.api.movieSimilar(id));
    details.similar = similar.results ? similar.results.slice(0,4) : [];
    store.pubsub.publish('movieDetailsUpdated', details);
  }
}
