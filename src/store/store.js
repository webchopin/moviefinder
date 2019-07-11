import PubSub from '../lib/pubsub.js';
import controller from '../controller/index.js';

export default class Store {
  constructor(state) {
    this.state = state || {};
    this.pubsub = new PubSub();
  }
  /* getGenres : get from store, localStorage, or API call.
     Similar to a Singleton: There is only one API call at first
  */
  async getGenres() {
    let genres;
    if (!this.state.hasOwnProperty('genres')) { // eslint-disable-line no-prototype-builtins
      this.state.genres = {};
    }
    if (Object.keys(this.state.genres).length !== 0) {
      return this.state.genres;
    }
    if (localStorage.getItem('genres') === null) {
      genres = await controller.loadGenres();
    } else {
      genres = JSON.parse(localStorage.getItem('genres'));
      this.state.genres = genres;
    }
    return genres;
  }

  initSearchState() {
    this.state.search = {currentPage: 1, movies: []};
    this.state.searchMode = true;
  }
}
