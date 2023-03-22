const { getAllMovies } = require('../controller/movies.controller');
module.exports = (app) => {
    app.get('/mba/api/v1/movies', getAllMovies);   
}