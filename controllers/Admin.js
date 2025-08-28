const { Op } = require('sequelize');
const { Product, User, Order, OrderItem, Category } = require('../models')
const { Sequelize } = require('sequelize');


class Admin {

    static async Home(req, res) {
        try {
            const listProducts = await Product.findAll();
            const listOrder = await Order.findAll()
            const sales = listOrder.map(el => el.totalAmount)
            const initialValue = 0;
            const totalSales = sales.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                initialValue,
            );
            const listUsers = await User.findAll({
                where: {
                    role: {
                        [Op.ne]: 'admin'
                    }
                }
            });
            const chartSales = await OrderItem.findAll({
                attributes: [
                    'ProductId',
                    [Sequelize.fn('SUM', Sequelize.col('totalPrice')), 'TotalSales']
                ],
                group: ['ProductId', 'Product.id', 'Product.name'],
                include: [{ model: Product, attributes: ['name'] }]
            });
            const salesData = chartSales.map(el => ({
                productName: el.Product.name,
                totalSales: parseInt(el.getDataValue('TotalSales'))
            }));

            res.render('homeAdmin', {
                listProducts,
                salesData: JSON.stringify(salesData),
                listUsers,
                listOrder,
                totalSales,
                activeNav: 'home',
                activeSide: 'home'
            })

        } catch (error) {
            // console.log(error)
            res.send(error)
        }
    }

    static async Product(req, res) {
        try {
            const categories = await Category.findAll();
            const { search, CategoryId, deleted } = req.query
            const listProduct = await Product.findProducts(search, CategoryId)
            console.log(listProduct)
            res.render('dashboardAdmin', {
                listProduct,
                deleted,
                categories,
                activeNav: 'products'
            });
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async Order(req, res) {
        try {
            const listProducts = await Product.findAll();
            const salesReport = await OrderItem.findAll({
                attributes: [
                    'id', 'quantity', 'price', 'totalPrice'
                ],
                group: ['Product.id', 'OrderItem.id', 'OrderItem.quantity', 'OrderItem.price', 'OrderItem.totalPrice'],
                include: [{ model: Product, attributes: ['id', 'name', 'stock'] }]
            });

            const price = salesReport.map(el => el.totalPrice)
            const quantity = salesReport.map(el => el.quantity)
            const initialValue = 0;
            const totalPrice = price.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                initialValue,
            );
            const totalQuantity = quantity.reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                initialValue,
            );
            res.render('orderPageAdmin', {
                listProducts,
                salesReport,
                totalPrice,
                totalQuantity,
                activeSide: 'order',
                activeNav: 'home'
            })
        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }

    static async Delete(req, res) {
        try {
            const { id } = req.params
            await Product.update({ isActive: false }, { where: { id } })
            res.redirect('/admin/products')
        } catch (error) {
            res.send(error)
        }
    }

    static async Logout(req, res) {
        try {
            req.session.destroy(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.redirect('/login')
                }
            })
        } catch (error) {
            // console.log(error)
            res.send(error)
        }
    }

}

module.exports = { Admin }