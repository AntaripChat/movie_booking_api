const {updatePassword, updateProfile} = require('../controller/user.controller');
const {verifyToken, isAdmin, validateUserProfile} = require('../middleware')

module.exports = (app) => {
    app.put('/mba/api/v1/updatePassword', verifyToken, updatePassword);
    app.put('/mba/api/v1/updateProfile/:userId', [verifyToken, isAdmin, validateUserProfile], updateProfile);
}