class adminHome {

    static async Home (req,res) {

        try {

            res.render('test')
            
        } catch (error) {
         
            res.send(error)

        }

    }

}

module.exports = { adminHome }