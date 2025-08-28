const {Category} = require('../models')

class Home {

    static async Home (req,res) {

        try {

            const {username,uId,balance} = req.session;
            const categories = await Category.findAll();
            res.render('home', {categories, username,uId,balance})
            
        } catch (error) {
         
            res.send(error)

        }

    }

}

module.exports = { Home }