import API from '../api.js';
import Controller from './controller.js';
import settings from '../settings.json';
import store from '../store/index.js';

export default new Controller(new API(
    settings.api_key,
    settings.api_base_url,
    store.state.language || 'en-US'
  )
);
