class Home {
    static async Home (req,res) {

        try {

            res.send('Home')
            
        } catch (error) {
         
            res.send(error)

        }

    }
}

module.exports = { Home }