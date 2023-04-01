const User = require('../models/users.models');
const { userTypes, userStatus} = require('../utils/constant')

async function validateUserReqBody(req, res, next){
    if(!req.body.name){
        return res.status(400).send({
            msg : 'Please provide name as well'
        })
    }

    if(!req.body.userId){
        return res.status(400).send({
            msg : 'Please provide userId as well'
        })
    }

    const user = await User.findOne({
        userId : req.body.userId
    })

    if(user){
        return res.status(400).send({
            msg : 'Please provide another userId as well this one already exists'
        })
    }

    if(!isValidEmail(req.body.email)){
        return res.status(400).send({
            msg : 'Please provide correct email format'
        })
    }

    const emailUser = await User.findOne({
        email : req.body.email
    })

    if(emailUser){
        return res.status(400).send({
            msg : 'Please provide another email as well this one already exists'
        })
    }

    const existUserType = [userTypes.CLIENT, userTypes.CUSTOMER, userTypes.ADMIN];
    const requestUserType = req.body.userType;

    if(requestUserType && !existUserType.includes(requestUserType)){
        return res.status(400).send({
            msg : 'please provide these three usertype CUSTOMER/ADMIN/CLIENT'
        })
    }

    next();
}

async function validateUserProfile(req, res, next){
    if(!req.body.name){
        return res.status(400).send({
            msg : 'Please provide name as well'
        })
    }

    const existUserType = [userTypes.CLIENT, userTypes.CUSTOMER, userTypes.ADMIN];
    const requestUserType = req.body.userType;

    if(!requestUserType || !existUserType.includes(requestUserType)){
        return res.status(400).send({
            msg : 'please provide these three usertype CUSTOMER/ADMIN/CLIENT'
        })
    }

    const existUserStatus = [userStatus.APPROVED, userStatus.PENDING, userStatus.REJECTED];
    const requestUserStatus = req.body.userStatus;

    if(!requestUserStatus || !existUserStatus.includes(requestUserStatus)){
        return res.status(400).send({
            msg : 'please provide these three userStatus APPROVED/PENDING/REJECTED'
        })
    }

    next();
}

const isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

module.exports = {validateUserReqBody, validateUserProfile}