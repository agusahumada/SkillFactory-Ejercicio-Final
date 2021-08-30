const router = require("express").Router();
const {home} = require("../controller/homeController")
const { register } = require('../controller/userController');

module.exports = function(){
    // Home routes
    router.get('/', home);
    router.get('/auth', );
    router.post('/auth', );

    // Profile Routes
    router.post('/register', register);
    router.get('/favorites', );
    router.post('/add-movie', );
    router.post('/edit-movie', );

    return router;
}
