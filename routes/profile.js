const { Profile } = require('../controllers/Profile');

const router = require('express').Router();


router.get('/', Profile.ProfileAndEdit);
router.post('/', Profile.PostProfileAndEdit);
router.get('/orders', Profile.GetAllOrders);
router.get('/orders/:orderId', Profile.GetOrderDetails);
router.post('/topup', Profile.TopUp)


module.exports = router;