const Theatre = require('../models/theatre.model');
const Movie = require('../models/movies.models');


async function getAllTheatres(req, res){

    let reqObject = {};
    if(req.query.name){
        reqObject.name = req.query.name;
    }
    if(req.query.city){
        reqObject.city = req.query.city;
    }
    if(req.query.pinCode){
        reqObject.pinCode = req.query.pinCode;
    }
    let theaters = await Theatre.find(reqObject);

    if(req.query.movieId){
        theaters = theaters.filter(theater => theater.movies.includes(req.query.movieId));
    }

    res.send(theaters);
}

async function getTheatreBasedOnId(req, res){

    const result = await Theatre.findOne({
        _id: req.params.id
    });

    res.send(result);
}

async function createTheatre(req,res){
    const theatreObject = {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pinCode: req.body.pinCode,
    }

    const theatre = await Theatre.create(theatreObject);
    res.status(201).send(theatre);
}

async function updateTheatre(req,res){
    let savedTheatre = await Theatre.findOne({
        _id: req.params.id
    })

    if(!savedTheatre){
        return res.status(400).send({
            msg: `Theatre Id ${req.params.id} does not exist`
        })
    }

    savedTheatre.name = req.body.name ?  req.body.name: savedTheatre.name; 
    savedTheatre.description = req.body.description ?  req.body.description : savedTheatre.description; 
    savedTheatre.city = req.body.city != undefined ? req.body.city : savedTheatre.city;
    savedTheatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : savedTheatre.pinCode;

    const updateTheatre = await savedTheatre.save();
    res.send(updateTheatre);
}

async function deleteTheatre(req,res){
    try{
        await Theatre.deleteOne({
            _id : req.params.id
        })
    return res.send(`Theatre id ${req.params.id} got deleted `);
    }catch(err){
        return res.status(500).send({ msg : 'Internal server error'});
    }

}

async function updateMoviesInTheatre(req, res){
    let savedTheatre = await Theatre.findOne(
        {
            _id : req.params.id
        }
    );
       // console.log('theatre', theatre);
    if(!savedTheatre){
        return res.status(400).send({
            msg : `This theatre ${req.params.id} does not exist in DB.`
        })
    }
    let movies = req.body.movieIds;// ['4567','3456']

    if(req.body.insert){
        // add movies in db...
        movies.forEach(movieId => {
            savedTheatre.movies.push(movieId);
        });

    }else{ // [1,2,3,4] savedTheatre -----> [1,2]
        // movie [3,4]
        movies.forEach(movieId => { 
            savedTheatre.movies = savedTheatre.movies.filter(elem => elem!= movieId);
        })
    }

   const updatedTheatre = await savedTheatre.save();
   res.send(updatedTheatre);
}

async function checkMovieInTheatre(req, res){
    let savedTheatre = await Theatre.findOne({
        _id: req.params.theatreId
    })

    let movie = await Movie.findOne({
        _id: req.params.movieId
    })

    let response = {
        msg : ''
    }

    if(savedTheatre.movies.includes(movie._id)){
        response.msg = 'Movie is running';
    }else{
        response.msg = 'Movie is not running';
    }

    res.send(response);
}

module.exports = {
    getAllTheatres,
    getTheatreBasedOnId,
    createTheatre,
    updateTheatre,
    deleteTheatre,
    updateMoviesInTheatre,
    checkMovieInTheatre
}