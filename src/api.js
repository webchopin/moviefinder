export default class API {

  constructor(key, baseURL, language = 'en-US') {
    this.apiKey = key;
    this.baseURL = baseURL;
    this.language = language;
  }

  _standardURL(endpoint) {
    return `${this.baseURL}${endpoint}?api_key=${this.apiKey}&language=${this.language}`;
  }
  inTheaters(page = 1) {
    return `${this._standardURL('/movie/now_playing')}&page=${page}`;
  }
  genres() {
    return this._standardURL('/genre/movie/list');
  }
  search(title, page = 1) {
    if (title) {
      return `${this._standardURL('/search/movie')}&query=${title}&page=${page}&include_adult=false`;
    }
    return this.inTheaters();
  }
  movie(id) {
    return this._standardURL(`/movie/${id}`);
  }
  movieVideos(id) {
    return this._standardURL(`/movie/${id}/videos`);
  }
  movieReviews(id) {
    return this._standardURL(`/movie/${id}/reviews`);
  }
  movieSimilar(id) {
    return this._standardURL(`/movie/${id}/similar`);
  }
}
