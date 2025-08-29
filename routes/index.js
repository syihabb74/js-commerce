const router = require('express').Router();
const { Home } = require('../controllers/Home');
const Login = require('./login');
const Register = require('./register');
const Dashboard = require('./dashboard');
const Profile = require('./profile')
const MiddleWare = require('../middlewares/middleware')
const Admin = require('./admin')
const { UserAuth } = require('../controllers/UserAuth');


router.get('/', Home.Home);
router.use('/register',Register);
router.use('/login', Login);
router.get('/logout', UserAuth.getLogout)
router.use(MiddleWare)
router.use('/profile', Profile)
router.use('/products', Dashboard)
router.use('/admin', Admin)


module.exports = router