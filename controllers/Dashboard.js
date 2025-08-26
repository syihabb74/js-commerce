const {Product, Category} = require('../models')

class Dashboard {

    static async GetListProduct (req,res) {

        try {

            const {deleted} = req.query;

            const listProduct = await Product.findAll();
            // console.log(listProduct)
            const id = 3;

            res.render('dashboard', {listProduct, id, deleted})
            
        } catch (error) {
            
            res.send(error)

        }
        
    }

    static async GetDetailProduct (req,res) {

        try {


            const {productId} = req.params;

            const product = await Product.findByPk(productId);

            // res.render('test', {})
            res.send('test')
            
        } catch (error) {
            
            res.send(error)

        }
        
    }

    static async BuyProduct (req,res) {

        try {

            res.send('test')
            
        } catch (error) {
            
            res.send(error)

        }
        
    }

    static async CreateProduct (req,res) {

        try {

            res.send('test')
            
        } catch (error) {
            
            res.send(error)

        }
        
    }

    static async PostCreateProduct (req,res) {

        try {

            res.send('test')
            
        } catch (error) {
            
            res.send(error)

        }
        
    }

    static async EditProduct (req,res) {

        try {

            const {productId} = req.params;
            const product = await Product.findByPk(productId);
            const categories = await Category.findAll();

            res.render('editProduct', {product, categories})
            
        } catch (error) {
            
            res.send(error)

        }
        
    }

    static async PostEditProduct (req,res) {

        try {

            const {productId} = req.params;
            const {name,price,stock,description,imageUrl,CategoryId} = req.body

            res.send('test')
            
        } catch (error) {
            
            res.send(error)

        }
        
    }

    static async DeleteProduct (req,res) {

        try {

            const {productId} = req.params;
            const product = await Product.findByPk(productId);
            await Product.destroy({where : {
                id : productId
            }});
            res.redirect(`/products?deleted=${product.name}`)
            
        } catch (error) {

            console.log(error)
            
            res.send(error)

        }
        
    }

}

module.exports = {Dashboard}