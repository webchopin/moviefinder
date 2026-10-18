const movie = id => ({
    id,
    title: `Movie ${id}`,
    poster_path: '/poster.jpg',
    release_date: '2026-01-01',
    genre_ids: [28],
    vote_average: 7.5,
    overview: `Overview of movie ${id}`,
});

const moviePage = (page, offset = 0) => ({
    page,
    total_pages: 5,
    results: Array.from({length: 20}, (_, i) => movie(offset + (page - 1) * 20 + i + 1)),
});

export function mockTmdb({ delay = 0 } = {}) {
    cy.intercept('GET', '**/genre/movie/list*', { genres : [{ id: 28, name: 'Action' }] }).as('genres');

    cy.intercept('GET', '**/movie/now_playing*', req => {
        req.reply({ body: moviePage(Number(req.query.page)), delay });
    }).as('inTheaters');

    cy.intercept('GET', '**/search/movie*', req => {
        if (req.query.query === '1nonexistingmovie') {
            return req.reply({ page: 1, total_pages: 0, results: [] });
        }
        req.reply({ body: moviePage(Number(req.query.page), 1000), delay });
    }).as('search');

    cy.intercept('GET', '**/movie/*/videos*', { results : [{ site: 'YouTube', key: 'abc', name: 'Trailer' }] }).as('videos');
    cy.intercept('GET', '**/movie/*/reviews*', { results : [{ author: 'Jane', content: 'Great movie' }] }).as('reviews');
    cy.intercept('GET', '**/movie/*/similar*', { results : [movie(9001), movie(9002)] }).as('similar');

    cy.intercept('GET', 'https://image.tmdb.org/**', { statusCode : 204 });
    cy.intercept('GET', 'https://www.youtube.com/embed/**', '<html></html>');
}