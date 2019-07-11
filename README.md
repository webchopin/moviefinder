<h1 align="center">
  <br>
  <img src="./video-camera.svg" alt="MovieFinder" width="160">
  <br>
  MovieFinder
  <br>
</h1>

<h4 align="center">A vanilla JS SPA movie web app using <a href="https://developers.themoviedb.org/3/getting-started" target="_blank">TMDB API</a>.</h4>

<p align="center">
  <a href="#main-features">Main Features</a> •
  <a href="#how-to-set-up">How To Set Up</a> •
  <a href="#how-to-test">How To Test</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

## Main Features

This can serve as a specification:

* Movies in theaters - Show latest movies currently available in theaters
  - This is the home page.
  - Initially 20 "In Theaters" movies are loaded.
  - After searching for movies, you can go back to "In Theaters" movies if you click on the logo in the header
* Search as you type
  - While you type, the web app will look for the movies matching your request.
  - The results contain up to 20 movies
  - If you empty the input search, the web app fallbacks to the "In Theaters" movies
* Infinite Scrolling
  - When you scroll to the bottom, 20 more movies are shown
  - As long as you don't refresh the page, the movies "In Theaters" are kept in a 'store' variable
  - If you modify your search, the result of the previous search is not kept in the 'store' variable
* Movie basic information - the following information is displayed
  - Picture
  - Title
  - Year
  - Genres
  - Average vote
  - Overview
* Movie details - these are shown when clicking on a specific movie. Clicking again will hide it. The following details are displayed
  - Movie videos (e.g. trailer)
  - Reviews
  - Similar movies

## How To Set Up

For the API to work, you need to request an API key from TDMB. Check `How do I apply for an API key?` [here](https://www.themoviedb.org/faq/api) for more information.

Enter the following in your command line:

```bash
# Clone this repository
$ git clone https://github.com/ismaile7/moviefinder

# Go into the repository
$ cd moviefinder

# Install dependencies
$ npm install
```

Enter your API key in `src/settings.json`

To run the web app, open `dist/index.html` in your browser.

If you update the code in `src`, you need to run `npx webpack`

## How To Test

E2E testing is used in this web app.

The web app uses Cypress.

Once you have installed the web app, you can run:
```bash
$ npm run cypress:open
```

## Credits

This web app uses the following open source packages:

- [ESLint](https://eslint.org/)
- [Webpack](https://webpack.js.org/)
- [Cypress](https://www.cypress.io/)
- Icons are taken from [Zondicons](http://www.zondicons.com/)

## License

MIT

---

> Twitter [@ismaileb7](https://twitter.com/ismaileb7)
