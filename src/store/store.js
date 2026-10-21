import PubSub from '../lib/pubsub.js';

export default class Store {
  constructor(state) {
    this.state = state || {};
    this.pubsub = new PubSub();
  }

  initSearchState() {
    this.state.search = {currentPage: 1, movies: []};
    this.state.searchMode = true;
  }
}
