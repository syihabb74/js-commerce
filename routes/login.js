const { UserAuth } = require('../controllers/UserAuth');
const router = require('express').Router();

router.get('/', UserAuth.LoginUser)
router.post('/', UserAuth.PostLoginUser)


module.exports = router;