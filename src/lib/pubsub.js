export default class PubSub {
  constructor() {
    this.topics = {};
  }
  subscribe(topic, callback) {
    if (!Object.hasOwn(this.topics, topic)) {
      this.topics[topic] = [];
    }
    return this.topics[topic].push(callback);
  }

  publish(topic, data = {}) {
    if (!Object.hasOwn(this.topics, topic)) {
      return [];
    }
    return this.topics[topic].map(callback => callback(data));
  }
}
