export default class API {

  constructor(key, baseURL, language = 'en-US') {
    this.apiKey = key;
    this.baseURL = baseURL;
    this.language = language;
  }

  // URLSearchParams encodes every value, so characters like & # + in a search can't break the URL
  _url(endpoint, params = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`);
    url.search = new URLSearchParams({api_key: this.apiKey, language: this.language, ...params});
    return url.toString();
  }
  inTheaters(page = 1) {
    return this._url('/movie/now_playing', {page});
  }
  genres() {
    return this._url('/genre/movie/list');
  }
  search(title, page = 1) {
    if (title) {
      return this._url('/search/movie', {query: title, page, include_adult: false});
    }
    return this.inTheaters();
  }
  movie(id, params = {}) {
    return this._url(`/movie/${id}`, params);
  }
  movieDetails(id) {
    return this.movie(id, {append_to_response: 'videos,reviews,similar'});
  }
}
