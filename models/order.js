'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     * 
     * 
     */

    get formatDateOrder () {
    const date = new Date(this.createdAt)
    return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
    }

    static associate(models) {
      Order.belongsTo(models.User, {foreignKey : 'UserId'})
      Order.hasMany(models.OrderItem, {foreignKey : 'OrderId'})
    }
  }
  Order.init({
    totalAmount: DataTypes.INTEGER,
    shippingAddress: { 
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : `Please fill address first`
        },
        notEmpty : {
          msg : `Please fill address first`
        }
      }
    },
    orderDate: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });


  return Order;
};