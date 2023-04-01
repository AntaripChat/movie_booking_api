const { validateMovieReqBody } = require('./verifyMovieReqBody');
const { verifyToken, isAdmin} = require('./auth');
const {validateUserReqBody, validateUserProfile} = require('./validateUserReqBody')
const {validateTheatreRequestBody} = require('./verifyTheatreReqBody')

module.exports = {
    validateMovieReqBody,
    verifyToken,
    isAdmin,
    validateUserReqBody,
    validateUserProfile,
    validateTheatreRequestBody
}