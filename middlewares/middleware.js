const router = require('express').Router();

router.use((req,res,next) => {
    if (req.session.uId) {
        return next()
    } else {
        return res.redirect('/login');
    }
})


module.exports = router