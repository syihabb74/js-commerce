const router = require('express').Router()

router.use((req, res, next) => {
    console.log(req.session)
    if (req.session.userId) {
        next() 
    } else {
        const error = 'Please login first!'
        res.redirect(`/login?error=${error}`)
    }
})

module.exports = router