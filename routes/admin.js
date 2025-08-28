const { adminHome } = require('../controllers/adminHome');
const router = require('express').Router()

router.get('/', adminHome.Home);
router.get('/products', adminHome.Product)
router.get('/logout', adminHome.Logout)

module.exports = router