const {userTypes, userStatus} = require("../utils/constant");
const bcrypt = require('bcrypt');
const User = require('../models/users.models');
const jwt = require('jsonwebtoken');
const { response } = require("express");

async function signUp(req, res){
    let userstatus = userStatus.APPROVED;

    if(req.body.userType && req.body.userType != userTypes.CUSTOMER){
        userstatus = userStatus.PENDING;
    }

    const userObject = {
        name: req.body.name,
        email: req.body.email,
        userId: req.body.userId,
        password: bcrypt.hashSync(req.body.password, 8),
        userType: req.body.userType,
        userStatus: userstatus
    }

    try{
        await User.create(userObject);
        res.send({
            msg : 'user has been created succesfully'
        })
    }catch(err)
    {
        res.status(400).send({
            msg: 'user have not been created succesfully',
            err
        })
    }


}

async function signIn(req,res){
    let user = await User.findOne({
        userId: req.body.userId
    });

    if(!user){
        return res.status(400).send({
            msg: 'UserID/Password does not match in DB.',
            token: null
        })
    }

    let isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if(!isPasswordValid){
        return res.status(400).send({
            msg: 'UserID/Password does not match in DB.',
            token: null
        }) 
    }

    const token = await jwt.sign({id :user._id}, 'heyeyehehyhhyh' ,{
        expiresIn: 120
    });

    const responseObject = {
        name : user.name,
        email: user.email,
        token: token,
        Type: user.userType,
        status: user.userStatus
    }

    res.send({msg: 'User loggedin successfully', responseObject});

}

module.exports = {
    signUp,
    signIn
}