const bcryptjs = require('bcryptjs');
const {User} = require('../models');
const user = require('../models/user');

class UserAuth {

    static async RegisterUser (req, res) {

        try {

            // console.log(await User.findAll())

            const {errorpasswordmatch, erroremail} = req.query;
            
            res.render('register', {
                errorpasswordmatch,
                erroremail
            })

        } catch (error) {
            
            res.send(error)

        }

    }

    static async PostRegisterUser (req, res) {

        try {

            const {email,username,password,confirmationPass} = req.body
            console.log(password !== confirmationPass)
            if (password !== confirmationPass) throw { matchpassmsg : 'Password not matching'};
            await User.create({email,username,password});
            
            res.send('ttep kesini');

        } catch (error) {

            console.log(error)
            
            if (error.matchpassmsg) {
                res.redirect(`/register?errorpasswordmatch=${error.matchpassmsg}`)
            } else {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    const alreadyReg = error.errors[0].message
                    res.redirect(`/register/?erroremail=${alreadyReg}`);
                }
            }

        }

    }

    static async VerificationRegisterUser (req, res) {

        try {
            
            res.render('verificationReg')

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


module.exports = { UserAuth }