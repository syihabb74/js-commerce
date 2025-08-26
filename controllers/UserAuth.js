const bcryptjs = require('bcryptjs');
const {User} = require('../models');



const { hash, sendMail } = require('../helpers/helper');



class UserAuth {

    static async RegisterUser (req, res) {

        try {
            const {errorpasswordmatch, erroremail,invalidcode} = req.query;
            res.render('register', {
                errorpasswordmatch,
                erroremail,
                invalidcode
            })

        } catch (error) {
            
            res.send(error)

        }

    }

    static async PostRegisterUser (req, res) {

        try {

            console.log(req.body)

            const {email,username,password,confirmationPass} = req.body
            if (password !== confirmationPass) throw { matchpassmsg : 'Password not matching'};
            await User.create({email,username,password});
            const verificationCode = Math.floor(100000 + Math.random() * 900000);
            const hashingCode = hash(verificationCode)
            await sendMail(verificationCode,email);
            res.redirect(`/register/verification/${email}?token=${hashingCode}`);

        } catch (error) {

            if (error.matchpassmsg) {
                res.redirect(`/register?errorpasswordmatch=${error.matchpassmsg}`)
            } else {
                if (error.name === 'SequelizeUniqueConstraintError') {
                    const alreadyReg = error.errors[0].message
                    res.redirect(`/register?erroremail=${alreadyReg}`);
                } else if (error.name === 'SequelizeValidationError') {
                    error = error.errors.map((err) => {
                        return err.message;
                    });
                    res.send(error)
                    
                } else {
                    res.send(error)
                }
            }

        }

    }

    static async VerificationRegisterUser (req, res) {

        try {

            const {token} = req.query
            const {email} = req.params;
            
            res.render('verificationReg', {
                token,email
            })

        } catch (error) {
            
            res.send(error)

        }

    }
    
    static async PostVerificationRegisterUser (req, res) {

        try {

            const {email} = req.params;
            const {token} = req.query;
            let {verification} = req.body;
            verification = verification.join('');
            const isValidCode = bcryptjs.compareSync(verification, token);
            if (isValidCode) {
                await User.update({isActive : true}, {where: {email : email}});
                return res.redirect('/')
            };
            throw {message : 'Invalid code verification'} 

        } catch (error) {
            
            res.redirect(`/register?invalidcode=${error.message}`)

        }

    }

    static async LoginUser (req, res) {

        try {

            const {invalidlogin} = req.query;
            
            res.render('login', {invalidlogin});

        } catch (error) {
            
            res.send(error)

        }

    }
    
    static async PostLoginUser (req, res) {

        try {
            const {email, password} = req.body;
            const isUserExist = await User.findOne({email});
            if (!isUserExist) throw {message : 'Invalid email/password'};
            const isPasswordCorrect = bcryptjs.compareSync(password,isUserExist.dataValues.password);
            if (!isPasswordCorrect) throw { message : 'Invalid email/password' };
            res.send('Anda sudah masuk')

        } catch (error) {
            
            res.redirect(`/login?invalidlogin=${error.message}`)

        }

    }
    


}


module.exports = { UserAuth }