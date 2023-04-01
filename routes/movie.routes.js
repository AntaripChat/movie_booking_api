const { getAllMovies, getMovieBasedOnId, createMovie, updateMovie, deleteMovie } = require('../controller/movies.controller');
const { validateMovieReqBody, verifyToken } = require('../middleware');

module.exports = (app) => {
    app.get('/mba/api/v1/movies',verifyToken , getAllMovies);   
    app.get('/mba/api/v1/movie/:id', getMovieBasedOnId); 
    app.post('/mba/api/v1/movie', validateMovieReqBody,createMovie); 
    app.put('/mba/api/v1/movie/:id', validateMovieReqBody, updateMovie);
    app.delete('/mba/api/v1/movie/:id', deleteMovie);
}