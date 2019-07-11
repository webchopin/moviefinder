import store from '../store/index.js';

export default class PageIndicator {
  constructor() {
    store.pubsub.subscribe('moviesUpdated', () => this.render());
    this.element = document.querySelector('[data-js=page-indicator]');
  }
  render() {
    this.element.innerHTML = `${store.state.searchMode ? 'Results:': 'In Theaters'}`;
  }
}
