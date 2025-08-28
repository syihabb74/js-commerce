const {Category} = require('../models')

class Home {

    static async Home (req,res) {

        try {

            const categories = await Category.findAll();

            res.render('home', {categories})
            
        } catch (error) {
         
            res.send(error)

        }

    }

}

module.exports = { Home }