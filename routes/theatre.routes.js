const { getAllTheatres, getTheatreBasedOnId, createTheatre,
    updateTheatre, deleteTheatre, updateMoviesInTheatre, checkMovieInTheatre } = require('../controller/theatre.controller');
const {validateTheatreRequestBody} = require('../middleware');

module.exports = (app) => {
   app.get('/mba/api/v1/theatres', getAllTheatres);   
   app.get('/mba/api/v1/theatre/:id', getTheatreBasedOnId); 
   app.post('/mba/api/v1/theatre',validateTheatreRequestBody,createTheatre); 
   app.put('/mba/api/v1/theatre/:id',validateTheatreRequestBody, updateTheatre);
   app.delete('/mba/api/v1/theatre/:id', deleteTheatre);
   app.put('/mba/api/v1/theatre/:id/movies', updateMoviesInTheatre);
   app.get('/mba/api/v1/theatres/:theatreId/movies/:movieId', checkMovieInTheatre)
}