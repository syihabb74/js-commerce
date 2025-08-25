const router = require('express').Router();
const { Home } = require('../controllers/Home');
const Login = require('./login');
const Register = require('./register');


router.get('/', Home.Home)
router.use('/login', Login);
router.use('/register',Register);


module.exports = router