const { Op } = require('sequelize');
const {Product, User} = require('../models')

class adminHome {

    static async Home(req, res) {
        try {
            const listProducts = await Product.findAll();
            const productsPrice = listProducts.map(el => ({
                productName: el.name,
                productPrice: el.price
            }))
            console.log(productsPrice.filter(el => el.productName))
            const listUsers = await User.findAll({
                where: {
                    role: {
                        [Op.ne]: 'admin'
                    }
                }
            })  
            res.render('homeAdmin', {
                listProducts,
                productsPrice: JSON.stringify(productsPrice),
                listUsers,
                active: 'home'
            })

        } catch (error) {
            // console.log(error)
            res.send(error)
        }
    }

    static async Product(req, res) {
        try {
            const listProduct = await Product.findAll();
            res.render('dashboardAdmin', {
                listProduct,
                active: 'products'
            })
        } catch (error) {
            res.send(error)
        }
    }

    static async Delete(req, res) {
        try {
            await Product.update({})
        } catch (error) {
            res.send(error)
        }
    }

    static async Logout(req, res) {
        try {
            req.session.destroy(err => {
                if (err) {
                    res.send(err)
                } else{
                    res.redirect('/login')
                }
            })
        } catch (error) {
            // console.log(error)
            res.send(error)
        }
    }

}

module.exports = { adminHome }