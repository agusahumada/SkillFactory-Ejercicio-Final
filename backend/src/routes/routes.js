const router = require("express").Router();
const {home} = require("../controller/moviesController/homeController")
const { register } = require('../controller/userController/registerController');
const { login } = require('../controller//userController/loginController');

module.exports = function(){
    router.get('/favorites', );
    router.get('/movies',);
    
    router.post('/register', register);
    router.post('/auth', login);
    router.post('/add-movie', );
    router.post('/edit-movie', );

    return router;
}
