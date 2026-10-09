import controller from './controller/index.js';
import Movies from './components/movies.js';
import PageIndicator from './components/pageindicator.js';
import settings from './settings.json';

let app = (function(){
  return {
    init: function(){
      const home = document.querySelector('[data-js=home-link]');
      const searchForm = document.querySelector('[data-js=movie-search]');
      const title = document.querySelector('[data-js=title]');
      new PageIndicator();
      new Movies();
      home && home.addEventListener('click', function() {
        controller.switchToInTheaters();
      });
      document.addEventListener('DOMContentLoaded', function() {
        controller.loadMovies();
      });
      document.addEventListener('scroll', function(){
        if (window.pageYOffset / document.documentElement.scrollHeight > settings.load_more_scroll_limit) {
          controller.loadMore();
        }
      });
      searchForm && searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
      });
      title && title.addEventListener('input', function(e) {
        controller.searchMovies(e.target.value);
      });
    }
  };
})();

// app has only one method, I could have called the code directly in the IIFE
app.init();
