/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js"
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ API)\n/* harmony export */ });\nclass API {\n  constructor(key, baseURL, language = 'en-US') {\n    this.apiKey = key;\n    this.baseURL = baseURL;\n    this.language = language;\n  }\n  _standardURL(endpoint) {\n    return `${this.baseURL}${endpoint}?api_key=${this.apiKey}&language=${this.language}`;\n  }\n  inTheaters(page = 1) {\n    return `${this._standardURL('/movie/now_playing')}&page=${page}`;\n  }\n  genres() {\n    return this._standardURL('/genre/movie/list');\n  }\n  search(title, page = 1) {\n    if (title) {\n      return `${this._standardURL('/search/movie')}&query=${title}&page=${page}&include_adult=false`;\n    }\n    return this.inTheaters();\n  }\n  movie(id) {\n    return this._standardURL(`/movie/${id}`);\n  }\n  movieVideos(id) {\n    return this._standardURL(`/movie/${id}/videos`);\n  }\n  movieReviews(id) {\n    return this._standardURL(`/movie/${id}/reviews`);\n  }\n  movieSimilar(id) {\n    return this._standardURL(`/movie/${id}/similar`);\n  }\n}\n\n//# sourceURL=webpack://moviefinder/./src/api.js?\n}");

/***/ },

/***/ "./src/components/moviedetails.js"
/*!****************************************!*\
  !*** ./src/components/moviedetails.js ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MovieDetails)\n/* harmony export */ });\n/* harmony import */ var _controller_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controller/index.js */ \"./src/controller/index.js\");\n/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/index.js */ \"./src/store/index.js\");\n\n\nclass MovieDetails {\n  constructor(id) {\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].pubsub.subscribe('movieDetailsUpdated', data => this.render(data));\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].pubsub.subscribe('movieDetailsLoading', data => this.startSpinner(data));\n    this.element = document.querySelector(`[data-js=movie-${id}] [data-js=details]`);\n    this.id = id;\n    this.expand = document.querySelector(`[data-js=movie-${id}] .expand`);\n    this.minimize = document.querySelector(`[data-js=movie-${id}] .minimize`);\n    this._initClickListeners();\n  }\n  _initClickListeners() {\n    this.expand.addEventListener('click', () => {\n      if (this.element.childElementCount === 0) {\n        // Load content and show spinner before loading\n        _controller_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadMovieDetails(this.id);\n      } else {\n        // Show animation when expand is used again after details are loaded\n        this._showAnimation();\n      }\n    });\n    this.minimize.addEventListener('click', () => {\n      this._hideAnimation();\n    });\n  }\n  render(movie) {\n    if (this.id != movie.id) return;\n    this.element.classList.add('d-none');\n    const video = this._addVideoToDetails(movie.video);\n    const reviews = this._addReviewsToDetails(movie.reviews);\n    const similarMovies = this._addSimilarMoviesToDetails(movie.similar);\n    this.element.innerHTML = `\n      <div class=\"video\">${video}</div>\n      <div class=\"reviews\">\n        <div class=\"reviews__header\">What people say about this movie:</div>\n        ${reviews}\n      </div>\n      <div class=\"similar-movies\">\n        <div class=\"similar-movies__header\">You might also like:</div>\n        ${similarMovies}\n      </div>\n    `;\n    this._showAnimation();\n  }\n  startSpinner(movieId) {\n    if (this.id != movieId) return;\n    this.element.classList.remove('d-none');\n    this.element.innerHTML = `\n      <div class=\"loading\">\n        <div class=\"loader\"></div>\n      </div>\n    `;\n  }\n  _addVideoToDetails(video) {\n    if (video.site === 'YouTube') {\n      return `\n        <div class=\"video__title\">\n          ${video.name}\n        </div>\n        <iframe\n         class=\"video__player\"\n         width=\"560\"\n         height=\"315\"\n         src=\"https://www.youtube.com/embed/${video.key}\"\n         frameborder=\"0\"\n         allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"\n         allowfullscreen>\n         </iframe>\n      `;\n    }\n    return 'No video to show';\n  }\n  _addReviewsToDetails(reviews) {\n    return reviews.length ? reviews.map(review => {\n      return `\n        <div class=\"review\">\n          <div class=\"review__byauthor\">\n            <span>by </span>\n            <span class=\"review__byauthor\">\n              ${review.author}\n            </span>\n            <span>:</span>\n          </div>\n          <blockquote class=\"review__text\">\n            ${review.content}\n          </blockquote>\n        </div>\n      `;\n    }).join('') : 'No reviews found';\n  }\n  _addSimilarMoviesToDetails(similarMovies) {\n    return `\n      <div class=\"similar-movies__text\">\n        ${similarMovies.length ? similarMovies.map(movie => movie.title).join(' | ') : 'No similar movies found'}\n      </div>\n    `;\n  }\n  _showAnimation() {\n    // Make details div visible\n    this.element.classList.remove('d-none');\n    // Then, add a little delay to make sure the animation will work\n    setTimeout(() => {\n      this.expand.classList.add('d-none');\n      this.minimize.classList.remove('d-none');\n      this.element.classList.remove('scale-animation-end');\n      this.element.classList.add('scale-animation-begin');\n    }, 10);\n  }\n  _hideAnimation() {\n    this.element.classList.add('scale-animation-end');\n    this.element.classList.remove('scale-animation-begin');\n    this.expand.classList.remove('d-none');\n    this.minimize.classList.add('d-none');\n    // Wait for the animation to end before hiding the div\n    setTimeout(() => {\n      this.element.classList.add('d-none');\n      this.element.parentNode.scrollIntoView({\n        behavior: 'smooth'\n      });\n    }, 300);\n  }\n}\n\n//# sourceURL=webpack://moviefinder/./src/components/moviedetails.js?\n}");

/***/ },

/***/ "./src/components/movies.js"
/*!**********************************!*\
  !*** ./src/components/movies.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Movies)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ \"./src/utils.js\");\n/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/index.js */ \"./src/store/index.js\");\n/* harmony import */ var _moviedetails_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./moviedetails.js */ \"./src/components/moviedetails.js\");\n\n\n\nclass Movies {\n  constructor() {\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].pubsub.subscribe('moviesUpdated', () => this.render());\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].pubsub.subscribe('moviesLoading', () => this.startSpinner());\n    this.element = document.querySelector('[data-js=movie-list]');\n    this.movies = [];\n  }\n  render() {\n    this.movies = _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.searchMode ? _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.search.movies : _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.inTheaters.movies;\n    if (this.movies.length === 0) {\n      this.element.innerHTML = '<div class=\"no-result\">No movies found for this query...</div>';\n    } else {\n      this._updateMovieList();\n    }\n    if (!_store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.searchMode) {\n      // Reinitialize search input - useful when home link is clicked\n      document.querySelector('[data-js=title]').value = '';\n    }\n    this.stopSpinner();\n  }\n  startSpinner() {\n    if (_store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.loadingMore) {\n      this.element.insertAdjacentHTML('afterend', '<div class=\"loading\"><div class=\"loader\"></div></div>');\n    } else {\n      this.element.innerHTML = '';\n      this.element.insertAdjacentHTML('beforebegin', '<div class=\"loading\"><div class=\"loader\"></div></div>');\n    }\n  }\n  stopSpinner() {\n    const loading = document.querySelector('.loading');\n    loading && loading.remove();\n  }\n  async _updateMovieList() {\n    const genres = await _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getGenres();\n    this.element.innerHTML = this.movies.map(movie => this._addMovieToList(movie, genres)).join('');\n    this.movies.forEach(movie => new _moviedetails_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"](movie.id));\n  }\n  _addMovieToList(movie, genres) {\n    return `\n      <div class=\"movie\" data-js=\"movie-${movie.id}\">\n        <img class=\"movie__img\" src=${movie.poster_path ? (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.imageURL)(movie.poster_path) : 'http://placehold.it/200x300'} alt=\"Movie cover\">\n        <div class=\"movie__information\" data-js=\"movie-info\">\n          <strong class=\"movie__title\">${movie.title}<span class=\"movie__release-year\"> (${movie.release_date ? movie.release_date.substr(0, 4) : 'Unknown date'})</span></strong>\n          <div class=\"movie__genres\">${movie.genre_ids ? movie.genre_ids.map(id => `<span class=\"movie__genre\">${genres[id]}</span>`).join(' | ') : ''}</div>\n          <div class=\"movie__vote-line\">Average vote: <span class=\"movie__vote\">${movie.vote_average}</span></div>\n          <div class=\"movie__overview\">${movie.overview}</div>\n          <button class=\"expand\" aria-label=\"More details\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" height=\"48\" width=\"48\" fill=\"#333\" class=\"expand__icon\" aria-hidden=\"true\"><path d=\"M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z\"/></svg>\n          </button>\n          <div data-js=\"details\" class=\"movie__details scale-animation-end d-none\">\n          </div>\n          <button class=\"minimize d-none\" aria-label=\"Hide details\">\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" height=\"48\" width=\"48\" fill=\"#333\" class=\"minimize__icon\" aria-hidden=\"true\"><path d=\"M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z\"/></svg>\n          </button>\n        </div>\n      </div>\n    `;\n  }\n}\n\n//# sourceURL=webpack://moviefinder/./src/components/movies.js?\n}");

/***/ },

/***/ "./src/components/pageindicator.js"
/*!*****************************************!*\
  !*** ./src/components/pageindicator.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PageIndicator)\n/* harmony export */ });\n/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/index.js */ \"./src/store/index.js\");\n\nclass PageIndicator {\n  constructor() {\n    _store_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].pubsub.subscribe('moviesUpdated', () => this.render());\n    this.element = document.querySelector('[data-js=page-indicator]');\n  }\n  render() {\n    this.element.innerHTML = `${_store_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].state.searchMode ? 'Results:' : 'In Theaters'}`;\n  }\n}\n\n//# sourceURL=webpack://moviefinder/./src/components/pageindicator.js?\n}");

/***/ },

/***/ "./src/controller/controller.js"
/*!**************************************!*\
  !*** ./src/controller/controller.js ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Controller)\n/* harmony export */ });\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ \"./src/utils.js\");\n/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../store/index.js */ \"./src/store/index.js\");\n/* harmony import */ var _settings_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../settings.json */ \"./src/settings.json\");\n\n\n\nclass Controller {\n  constructor(api) {\n    this.api = api;\n  }\n  async loadGenres() {\n    let genres = {};\n    const res = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchApi)(this.api.genres());\n    if (res && res.genres) {\n      genres = res.genres.reduce((result, {\n        id,\n        name\n      }) => {\n        result[id] = name;\n        return result;\n      }, {});\n      localStorage.setItem('genres', JSON.stringify(genres));\n      _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.genres = genres;\n    } else {\n      console.error('No genres');\n    }\n    return genres;\n  }\n  async loadMovies() {\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].pubsub.publish('moviesLoading');\n    const moviesJson = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchApi)(_store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.searchInput ? this.api.search(_store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.searchInput, _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.search.currentPage) : this.api.inTheaters(_store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.inTheaters.currentPage));\n    if (_store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.searchInput) {\n      _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.search.movies.push(...moviesJson.results);\n    } else {\n      _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.inTheaters.movies.push(...moviesJson.results);\n    }\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].pubsub.publish('moviesUpdated');\n    // Loading more and searching for a new movie at the same time might cause issues.\n    // The lock is not used when searching for movies, it might be used there but it would need further reflexion.\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.loadLocked = false; // eslint-disable-line require-atomic-updates\n  }\n  loadMore() {\n    // Avoid multiple loads when scrolling to the bottom\n    if (!_store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.loadLocked) {\n      _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.loadingMore = true;\n      _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.loadLocked = true;\n      _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.searchMode ? _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.search.currentPage++ : _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.inTheaters.currentPage++;\n      this.loadMovies();\n    }\n  }\n  searchMovies(userInput) {\n    if (!userInput) {\n      // From non-empty to empty\n      this.switchToInTheathers();\n    } else {\n      _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.loadingMore = false;\n      _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].initSearchState();\n      // Make sure there are no concurrent searches\n      clearTimeout(_store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.searchTimer);\n      _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.searchTimer = setTimeout(() => {\n        _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.searchInput = userInput;\n        this.loadMovies();\n      }, _settings_json__WEBPACK_IMPORTED_MODULE_2__.search_delay);\n    }\n  }\n  switchToInTheathers() {\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.loadingMore = false;\n    // No API call is triggered as we keep inTheaters in our store state\n    // -> we could comment the next line\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].pubsub.publish('moviesLoading');\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].initSearchState();\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.searchInput = '';\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].state.searchMode = false;\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].pubsub.publish('moviesUpdated');\n  }\n  async loadMovieDetails(id) {\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].pubsub.publish('movieDetailsLoading', id);\n    let details = {\n      id\n    };\n    // If any video, taking the first one\n    const videos = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchApi)(this.api.movieVideos(id));\n    details.video = videos.results && videos.results.length ? videos.results[0] : {};\n    // Taking up to 2 reviews\n    const reviews = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchApi)(this.api.movieReviews(id));\n    details.reviews = reviews.results ? reviews.results.slice(0, 2) : [];\n    // Taking up to 4 similar movies\n    const similar = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchApi)(this.api.movieSimilar(id));\n    details.similar = similar.results ? similar.results.slice(0, 4) : [];\n    _store_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].pubsub.publish('movieDetailsUpdated', details);\n  }\n}\n\n//# sourceURL=webpack://moviefinder/./src/controller/controller.js?\n}");

/***/ },

/***/ "./src/controller/index.js"
/*!*********************************!*\
  !*** ./src/controller/index.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api.js */ \"./src/api.js\");\n/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller.js */ \"./src/controller/controller.js\");\n/* harmony import */ var _settings_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../settings.json */ \"./src/settings.json\");\n/* harmony import */ var _store_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/index.js */ \"./src/store/index.js\");\n\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new _controller_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](new _api_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](_settings_json__WEBPACK_IMPORTED_MODULE_2__.api_key, _settings_json__WEBPACK_IMPORTED_MODULE_2__.api_base_url, _store_index_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].state.language || 'en-US')));\n\n//# sourceURL=webpack://moviefinder/./src/controller/index.js?\n}");

/***/ },

/***/ "./src/index.js"
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controller_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller/index.js */ \"./src/controller/index.js\");\n/* harmony import */ var _components_movies_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/movies.js */ \"./src/components/movies.js\");\n/* harmony import */ var _components_pageindicator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/pageindicator.js */ \"./src/components/pageindicator.js\");\n/* harmony import */ var _settings_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settings.json */ \"./src/settings.json\");\n\n\n\n\nlet app = function () {\n  return {\n    init: function () {\n      const home = document.querySelector('[data-js=home-link]');\n      const searchForm = document.querySelector('[data-js=movie-search]');\n      const title = document.querySelector('[data-js=title]');\n      new _components_pageindicator_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\n      new _components_movies_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n      home && home.addEventListener('click', function () {\n        _controller_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].switchToInTheathers();\n      });\n      document.addEventListener('DOMContentLoaded', function () {\n        _controller_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadMovies();\n      });\n      document.addEventListener('scroll', function () {\n        if (window.pageYOffset / document.documentElement.scrollHeight > _settings_json__WEBPACK_IMPORTED_MODULE_3__.load_more_scroll_limit) {\n          _controller_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].loadMore();\n        }\n      });\n      searchForm && searchForm.addEventListener('submit', function (e) {\n        e.preventDefault();\n      });\n      title && title.addEventListener('input', function (e) {\n        _controller_index_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].searchMovies(e.srcElement.value);\n      });\n    }\n  };\n}();\n\n// app has only one method, I could have called the code directly in the IIFE\napp.init();\n\n//# sourceURL=webpack://moviefinder/./src/index.js?\n}");

/***/ },

/***/ "./src/lib/pubsub.js"
/*!***************************!*\
  !*** ./src/lib/pubsub.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PubSub)\n/* harmony export */ });\nclass PubSub {\n  constructor() {\n    this.topics = {};\n  }\n  subscribe(topic, callback) {\n    if (!this.topics.hasOwnProperty(topic)) {\n      // eslint-disable-line no-prototype-builtins\n      this.topics[topic] = [];\n    }\n    return this.topics[topic].push(callback);\n  }\n  publish(topic, data = {}) {\n    if (!this.topics.hasOwnProperty(topic)) {\n      // eslint-disable-line no-prototype-builtins\n      return [];\n    }\n    return this.topics[topic].map(callback => callback(data));\n  }\n}\n\n//# sourceURL=webpack://moviefinder/./src/lib/pubsub.js?\n}");

/***/ },

/***/ "./src/store/index.js"
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state.js */ \"./src/store/state.js\");\n/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store.js */ \"./src/store/store.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new _store_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](_state_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]));\n\n//# sourceURL=webpack://moviefinder/./src/store/index.js?\n}");

/***/ },

/***/ "./src/store/state.js"
/*!****************************!*\
  !*** ./src/store/state.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  genres: {},\n  inTheaters: {\n    currentPage: 1,\n    movies: []\n  },\n  search: {\n    currentPage: 1,\n    movies: []\n  },\n  searchMode: false,\n  searchInput: '',\n  loadingMore: false,\n  language: 'en-US'\n});\n\n//# sourceURL=webpack://moviefinder/./src/store/state.js?\n}");

/***/ },

/***/ "./src/store/store.js"
/*!****************************!*\
  !*** ./src/store/store.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Store)\n/* harmony export */ });\n/* harmony import */ var _lib_pubsub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/pubsub.js */ \"./src/lib/pubsub.js\");\n/* harmony import */ var _controller_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controller/index.js */ \"./src/controller/index.js\");\n\n\nclass Store {\n  constructor(state) {\n    this.state = state || {};\n    this.pubsub = new _lib_pubsub_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n  /* getGenres : get from store, localStorage, or API call.\n     Similar to a Singleton: There is only one API call at first\n  */\n  async getGenres() {\n    let genres;\n    if (!this.state.hasOwnProperty('genres')) {\n      // eslint-disable-line no-prototype-builtins\n      this.state.genres = {};\n    }\n    if (Object.keys(this.state.genres).length !== 0) {\n      return this.state.genres;\n    }\n    if (localStorage.getItem('genres') === null) {\n      genres = await _controller_index_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].loadGenres();\n    } else {\n      genres = JSON.parse(localStorage.getItem('genres'));\n      this.state.genres = genres;\n    }\n    return genres;\n  }\n  initSearchState() {\n    this.state.search = {\n      currentPage: 1,\n      movies: []\n    };\n    this.state.searchMode = true;\n  }\n}\n\n//# sourceURL=webpack://moviefinder/./src/store/store.js?\n}");

/***/ },

/***/ "./src/utils.js"
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   fetchApi: () => (/* binding */ fetchApi),\n/* harmony export */   imageURL: () => (/* binding */ imageURL)\n/* harmony export */ });\n/* harmony import */ var _settings_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings.json */ \"./src/settings.json\");\n\nfunction imageURL(path) {\n  return `${_settings_json__WEBPACK_IMPORTED_MODULE_0__.img_base_url}${path}`;\n}\nasync function fetchApi(url, options = {}) {\n  const response = await fetch(url, {\n    ...options\n  });\n  if (response.ok) {\n    return response.json();\n  }\n  throw await response.json();\n}\n\n//# sourceURL=webpack://moviefinder/./src/utils.js?\n}");

/***/ },

/***/ "./src/settings.json"
/*!***************************!*\
  !*** ./src/settings.json ***!
  \***************************/
(module) {

eval("{module.exports = /*#__PURE__*/JSON.parse('{\"api_key\":\"\",\"api_base_url\":\"https://api.themoviedb.org/3\",\"img_base_url\":\"https://image.tmdb.org/t/p/w200\",\"load_more_scroll_limit\":0.8,\"search_delay\":300}');\n\n//# sourceURL=webpack://moviefinder/./src/settings.json?\n}");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	let __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;