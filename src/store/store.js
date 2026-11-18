import PubSub from '../lib/pubsub.js';

export default class Store {
  constructor(state) {
    this.state = state || {};
    this.pubsub = new PubSub();
  }

  initSearchState() {
    this.state.search = {currentPage: 1, totalPages: 0, movies: []};
    this.state.searchMode = true;
  }
}
