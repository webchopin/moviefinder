export default class PubSub {
  constructor() {
    this.topics = {};
  }
  subscribe(topic, callback) {
    if (!this.topics.hasOwnProperty(topic)) { // eslint-disable-line no-prototype-builtins
      this.topics[topic] = [];
    }
    return this.topics[topic].push(callback);
  }

  publish(topic, data = {}) {
    if (!this.topics.hasOwnProperty(topic)) { // eslint-disable-line no-prototype-builtins
      return [];
    }
    return this.topics[topic].map(callback => callback(data));
  }
}
