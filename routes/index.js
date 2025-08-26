const router = require('express').Router();
const { Home } = require('../controllers/Home');
const Login = require('./login');
const Register = require('./register');
const Dashboard = require('./dashboard')


router.get('/', Home.Home);
router.use('/products', Dashboard)
router.use('/login', Login);
router.use('/register',Register);


module.exports = router