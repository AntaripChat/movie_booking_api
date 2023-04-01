const {signUp, signIn} = require('../controller/auth.controller');
const { validateUserReqBody} = require('../middleware/')

module.exports = (app) => {
    app.post('/mba/api/v1/signup', validateUserReqBody, signUp);
    app.post('/mba/api/v1/signin', signIn);
}