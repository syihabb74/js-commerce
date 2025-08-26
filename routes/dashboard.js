const { Dashboard } = require('../controllers/Dashboard');

const router = require('express').Router();

router.get('/', Dashboard.GetListProduct);
router.get('/add/:userId', Dashboard.CreateProduct);
router.post('/add/:userId', Dashboard.PostCreateProduct)
router.get('/edit/:productId', Dashboard.EditProduct)
router.post('/edit/:productId', Dashboard.PostEditProduct)
router.get('/buy/:userId/:productId', Dashboard.BuyProduct)
router.get('/delete/:productId', Dashboard.DeleteProduct);
router.get('/:productId', Dashboard.GetDetailProduct)

module.exports = router;