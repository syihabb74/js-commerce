class Home {

    static async Home (req,res) {

        try {

            res.send('test')
            
        } catch (error) {
         
            res.send(error)

        }

    }

}

module.exports = { Home }