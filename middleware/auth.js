const jwt = require('jsonwebtoken');
const User = require('../models/users.models');

async function verifyToken(req, res, next){
    const userToken = req.headers['x-access-token'];
    if(!userToken){
        return res.status(400).send({
            msg : 'Please provide token to proceed'
        })
    }
    try{
        const decoded = await jwt.verify(userToken, 'heyeyehehyhhyh');
        if(!decoded){
            return res.status(400).send({
                msg : 'Token is not correct'
            })
        }
        req._id = decoded.id;
    
        next()
    }
    catch(err){
        return res.status(400).send({
            msg : 'Token is not correct'
        })
    }

}

async function isAdmin(req, res, next){
    const id = req._id;

    const user = await User.findOne({
        _id: id
    })
    console.log('user', user);
    if(user && user.userType !=='ADMIN' && user.userStatus !== 'APPROVED'){
        return res.status(400).send({
            msg :"Only Admin allowed to do this operation"
        })
    }

    next();
}

module.exports = {
    verifyToken,
    isAdmin
}