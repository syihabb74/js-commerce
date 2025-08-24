const bcryptjs = require('bcryptjs');

class UserAuth {

    static async RegisterUser (req, res) {

        try {
            
            res.send('error');

        } catch (error) {
            
            res.send(error)

        }

    }

    static async PostRegisterUser (req, res) {

        try {

            const {email,password,username,} = req.body

            const salt = bcryptjs.genSalt(10);
            // const hash = bcryptjs.hashSync('', salt) for later
            
            res.send('error');

        } catch (error) {
            
            res.send(error)

        }

    }

    static async VerificationRegisterUser (req, res) {

        try {
            
            res.send('error');

        } catch (error) {
            
            res.send(error)

        }

    }
    
    static async PostVerificationRegisterUser (req, res) {

        try {
            
            res.send('error');

        } catch (error) {
            
            res.send(error)

        }

    }

    static async LoginUser (req, res) {

        try {
            
            res.send('error');

        } catch (error) {
            
            res.send(error)

        }

    }
    
    static async PostLoginUser (req, res) {

        try {
            
            res.send('error');

        } catch (error) {
            
            res.send(error)

        }

    }
    


}


module.exports = {UserAuth}