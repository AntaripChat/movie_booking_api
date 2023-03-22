const Movie = require("../models/movies.models");


async function getAllMovies(req, res){

    let reqObject = {};
    if(req.query.name){
        reqObject.name = req.query.name;
    }
    const result = await Movie.find(reqObject);

    res.send(result);
}

async function getMovieBasedOnId(req, res){

    const result = await Movie.find({
        _id: req.params.id
    });

    res.send(result);
}

module.exports = {
    getAllMovies,
    getMovieBasedOnId
}