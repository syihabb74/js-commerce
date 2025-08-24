const { UserAuth } = require('../controllers/UserAuth');
const router = require('express').Router();


router.get('/', UserAuth.RegisterUser);
router.post('/', UserAuth.PostRegisterUser)
router.get('/verification/:email', UserAuth.VerificationRegisterUser);
router.post('/verification/:email', UserAuth.PostVerificationRegisterUser)




module.exports = router;