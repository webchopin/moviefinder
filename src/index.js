import './styles/main.css';
import controller from './controller/index.js';
import Movies from './components/movies.js';
import PageIndicator from './components/pageindicator.js';
import settings from './settings.js';

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
      controller.loadMovies();
      const loadMore = document.querySelector('[data-js=load-more]');
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          controller.loadMore();
        }
      }, { root: document, rootMargin: `0px 0px ${settings.load_more_margin} 0px` });
      observer.observe(loadMore);

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
