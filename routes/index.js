const router = require('express').Router();
const { Home } = require('../controllers/Home');
const {Dashboard} = require('../controllers/Dashboard');
const Login = require('./login');
const Register = require('./register');
const dashboard = require('./dashboard');
const { UserAuth } = require('../controllers/UserAuth');
const Middleware = require('../middlewares/middleware');
const Admin = require('./admin')


router.use('/register',Register);
router.use('/login', Login);
router.get('/logout', UserAuth.getLogout)
router.use(Middleware)
router.get('/', Home.Home);
router.use('/products', dashboard)
router.use('/admin', Admin);


module.exports = router