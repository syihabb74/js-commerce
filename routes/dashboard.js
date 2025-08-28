const { Dashboard } = require('../controllers/Dashboard');

const router = require('express').Router();

router.get('/', Dashboard.GetListProduct);
router.get('/add', Dashboard.CreateProduct);
router.post('/add', Dashboard.PostCreateProduct)
router.get('/edit/:productId', Dashboard.EditProduct)
router.post('/edit/:productId', Dashboard.PostEditProduct)
router.get('/buy/:productId', Dashboard.BuyProduct)
router.get('/delete/:productId', Dashboard.DeleteProduct);
router.get('/:productId', Dashboard.GetDetailProduct)

module.exports = router;