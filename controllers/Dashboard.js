
const {Product, Category, User, Order, UserProfile, OrderItem} = require('../models')

class Dashboard {

    static async GetListProduct (req,res) {

        try {
            const {uId,username,balance} = req.session;
            const categories = await Category.findAll();
            const {search, CategoryId, deleted} = req.query
            const listProduct = await Product.findProducts(search,CategoryId)
            res.render('dashboard', {listProduct, uId, deleted, categories,username,balance});
            
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        
    }

    static async GetDetailProduct (req,res) {

        try {
            const {productId} = req.params;
            const {uId} = req.session;
            const product = await Product.findByPk(productId);
            res.render('detailsProduct', {product, uId})
        } catch (error) {
            res.send(error)
        }
        
    }

    static async BuyProduct (req,res) {

        try {
            let {quantity} = req.query
            const {productId} = req.params
            const user = await User.findByPk(req.session.uId, {
                include : UserProfile
            });
            const product = await Product.findByPk(productId);
            quantity = quantity || 1;
            if (product.price * quantity > user.balance) {
                throw {msg : 'Balance is not enough please re-charge first'}
            }

            const orderCreate = await Order.create({
                totalAmount : quantity * product.price,
                orderDate : new Date(),
                shippingAddress : user.UserProfile.address,
                UserId : req.session.uId
            });
            await OrderItem.create({quantity,price : product.price,OrderId : orderCreate.id,ProductId: productId, totalPrice : product.price * quantity})
            await user.decrement({balance : product.price * quantity});
            await product.decrement({stock : quantity})
            req.session.balance = user.balance
            res.redirect('/products')
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                console.log(error.errors)
                return res.redirect(`/profile?erroraddress=${error.errors[0].msg}`)

            } else {
                return res.redirect(`/profile?errorbalance=${error.msg}`)
            }
        }
        
    }

    static async CreateProduct (req,res) {

        try {

            const {username,balance} = req.session
            
            let {errors} = req.query;
            if (errors !== undefined && errors.length) {
                errors = errors.split(',')
            }
            const categories = await Category.findAll()
            res.render('createProduct', {categories, errors,username,balance})
        } catch (error) {
            console.log(error)
            res.send(error)
        }
        
    }

    static async PostCreateProduct (req,res) {

        try {


            const {name,price,stock,description,imageUrl,CategoryId} = req.body
            await Product.create({name,price,stock,description,imageUrl,CategoryId,UserId : req.session.uId});
            res.redirect('/products')
            
        } catch (error) {

            if (error.name === 'SequelizeValidationError') {
                console.log(error)
                error = error.errors.map((value) => {
                    return value.message
                })
                res.redirect(`/products/add?errors=${error}`)
            } else {
                res.send(error)
            }

        }
        
    }

    static async EditProduct (req,res) {

        try {
            let {errors} = req.query;
            if (errors && errors.length) {
                errors = errors.split(',')
            }
            const {productId} = req.params;
            const product = await Product.findByPk(productId);
            const categories = await Category.findAll();
            res.render('editProduct', {product, categories, errors})
            
        } catch (error) {
            
            res.send(error)

        }
        
    }

    static async PostEditProduct (req,res) {

        try {

            const {productId} = req.params;
            const {name,price,stock,description,imageUrl,CategoryId} = req.body;
            const product = await Product.findByPk(productId)
            await product.update({name,price,stock,description,imageUrl,CategoryId})
            res.redirect('/products')
            
        } catch (error) {

            const {productId} = req.params;
            if (error.name === 'SequelizeValidationError') {
                error = error.errors.map((value) => {
                    return value.message
                })
                res.redirect(`/products/edit/${productId}?errors=${error}`)
            } else {
                res.send(error)
            }

        }
        
    }

    static async DeleteProduct (req,res) {

        try {

            const {productId} = req.params;
            const product = await Product.findByPk(productId);
            await Product.update({isActive : false},{where : {
                id : productId
            }});
            res.redirect(`/products?deleted=${product.name}`)
            
        } catch (error) {

            
            res.send(error)

        }
        
    }

}

module.exports = {Dashboard}