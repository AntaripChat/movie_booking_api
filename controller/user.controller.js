const User = require('../models/users.models');
const bcrypt = require('bcrypt');

async function updatePassword(req, res){
    const userId = req._id;
    try{
    const user = await User.findOneAndUpdate({
        _id: userId
    }, {
        password: bcrypt.hashSync(req.body.password, 8)
    }).exec();

    res.send({
        sucesss: true,
        msg : 'Password updated succesfully'
    })
    }
    catch(err){
        return res.send({
            msg : 'Password update failed',
            err
        })
    }
}

async function updateProfile(req, res){
    const userId = req.params.userId;
    try{
    await User.findOneAndUpdate({
        userId: userId
    }, {
        userType: req.body.userType,
        userStatus: req.body.userStatus,
        name: req.body.name
    }).exec();

    res.send({
        sucesss: true,
        msg : 'User profile updated successfully'
    })
    }
    catch(err){
        return res.send({
            msg : 'User profile updation got failed',
            err
        })
    }
}

module.exports = {
    updatePassword,
    updateProfile
}