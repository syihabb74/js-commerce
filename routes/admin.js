const { Admin } = require('../controllers/Admin');
const router = require('express').Router()

router.get('/', Admin.Home);
router.get('/products', Admin.Product);
// router.get('/edit/:id', Admin.Product);
// router.post('/edit/:id', Admin.Product);
router.get('/order', Admin.Order)
router.get('/logout', Admin.Logout);
router.get('/delete/:id', Admin.Delete)

module.exports = router