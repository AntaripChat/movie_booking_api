const { getAllMovies, getMovieBasedOnId } = require('../controller/movies.controller');
module.exports = (app) => {
    app.get('/mba/api/v1/movies', getAllMovies);   
    app.get('/mba/api/:abc/v1/movies/:id', getMovieBasedOnId); 
}