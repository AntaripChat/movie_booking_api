const Theatre = require("../models/theatre.model");

validateTheatreRequestBody = async (req, res, next) => {

    //Validate the theatre  name
    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed! Theatre name is not provided !"
        });

    }

    //Validate the theatre description
    if(!req.body.description){
        return res.status(400).send({
            message: "Failed! Theatre description is not provided !"
        });  
    }

    //Validate the theatre city 
    if(!req.body.city){
        return res.status(400).send({
            message: "Failed! Theatre city is not provided !"
        });  
    }

    //Validate the theatre pincode
    if(!req.body.pinCode){
        return res.status(400).send({
            message: "Failed! Theatre location pincode is not provided !"
        });  
    }

    /**
     * Validate same theatre at the same location is not created
     */
    const theatre = await Theatre.findOne({name: req.body.name , pinCode : req.body.pinCode});
    if(theatre!=null){
        return res.status(400).send({
            message: "Failed! Same theatre in same location already exists !"
        }); 
    }


    next();

}


module.exports = {validateTheatreRequestBody};