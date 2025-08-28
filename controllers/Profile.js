const {Product, User,OrderItem,Order,UserProfile} = require('../models')

class Profile {

    static async ProfileAndEdit (req,res) {

        try {

            const {uId, username, balance} = req.session
            const {errorbalance, erroraddress,errortopup} = req.query;

            const details = await User.findByPk(uId, {
                include : [{
                    model : UserProfile},{
                        model : Order,
                        include : {
                            model : OrderItem,
                            include : Product
                    }
                }]
            });

            const {dataValues} = details;
            const profile = dataValues.UserProfile;

            console.log(profile.dateOfBirth)

            let orders = dataValues.Orders;
            console.log(orders)
            orders = orders.length > 2 ? orders.slice(0,2) : orders;
            res.render('userDetails', {errorbalance,profile, dataValues,orders,details, erroraddress,errortopup, username,balance})
            
        } catch (error) {
            
            res.send(error)

        }

    }


    static async PostProfileAndEdit (req,res) {

        try {

            const {firstName,lastName,dateOfBirth,gender,address} = req.body;
            const {uId} = req.session
            const profile = await UserProfile.findByPk(uId);
            const updatedAt = new Date();
            profile.update({firstName,lastName,dateOfBirth : new Date(dateOfBirth),updatedAt,gender,address})
            res.redirect('/profile')
            
        } catch (error) {

            
            res.send(error);

        }

    }


    static async GetAllOrders (req,res) {

        try {

            const {uId,username,balance} = req.session;

            const details = await User.findByPk(uId, {
                include : [{model : UserProfile},{model : Order,}]
            });
            const {dataValues} = details;
            const profile = dataValues.UserProfile;
            const orders = dataValues.Orders;

            res.render('listOrder', {profile, dataValues,orders,balance,username})
            
        } catch (error) {
            
            res.send(error)

        }

    }

    static async GetOrderDetails (req,res) {

        try {
            const order = await Order.findByPk(req.params.orderId);
            const {uId,balance,username} = req.session
            const orderItems = await OrderItem.findAll({where : {
                OrderId : req.params.orderId
            },
                include : Product
        });

            res.render('orderDetails', {order,orderItems,uId,balance,username})
        } catch (error) {
            
            res.send(error)

        }

    }

    static async TopUp (req,res) {

        try {

            const {balance} = req.body;
            if (balance < 1) throw {msg : `Minimum Top Up is 0`}
            const {uId} = req.session;
            const user = await User.findByPk(uId);
            await user.increment({balance})
            req.session.balance = user.balance
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
            
            if (error.msg) {
                res.redirect(`/profile?errortopup=${error.msg}`)
            } else {
                res.send(error)
            }

        }

    }


}


module.exports = {Profile}