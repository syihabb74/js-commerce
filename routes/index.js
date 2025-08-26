const router = require('express').Router();
const { Home } = require('../controllers/Home');
const {Dashboard} = require('../controllers/Dashboard');
const Login = require('./login');
const Register = require('./register');
const dashboard = require('./dashboard');
const { UserAuth } = require('../controllers/UserAuth');


router.use('/register',Register);
router.use('/login', Login);
router.get('/logout', UserAuth.getLogout)

router.use(function(req, res, next) {
    console.log(req.session)
    if (req.session.userId) {
        next() 
    } else {
        const error = 'Please login first!'
        res.redirect(`/login?error=${error}`)
    }
})

router.get('/', Home.Home);
router.use('/products', dashboard)
router.get('/admin', Dashboard.GetListProduct);


module.exports = router