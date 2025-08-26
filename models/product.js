'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, {foreignKey: 'UserId'});
      Product.belongsTo(models.Category, {foreignKey : 'CategoryId'})
    }


    get maxFourWords() {
      let four = this.description.split(' ').slice(0,4).join(' ')
      return four
    }

  }
  Product.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Product Name is empty please fill product name'
        },
        notEmpty : {
          msg : 'Product Name is empty please fill product name'
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Price is empty please fill price',
        },
        notNull : {
          msg : 'Price is empty please fill price'
        },
        min : {
          args : 1,
          msg : 'Minimum price is 1'
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Price is empty please fill stock',
        },
        notNull : {
          msg : 'Price is empty please fill stock'
        },
        min : {
          args : 1,
          msg : 'Minimum stock is 1'
        }
      }
    },
    description: {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Description is empty please fill description',
        },
        notNull : {
          msg : 'Description is empty please fill description'
        }
      }
    },
    imageUrl: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Image Url is empty please fill image url',
        },
        notNull : {
          msg : 'Image Url is empty please fill image url'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};