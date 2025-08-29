'use strict';
const {
  Model,
  Op
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
      Product.hasMany(models.OrderItem, {foreignKey: 'ProductId'})
    }

    maxFourWords() {
      let four = this.description.split(' ').slice(0,4).join(' ')
      return four
    }

    static async findProducts (search, CategoryId) {
      const options = {where : {
                      isActive : true
                  }}
                  
                  if (search) {
                      options.where.name = {
                              [Op.iLike] : `%${search}%`
                      }
                  }
      
                  if (CategoryId) {
                      options.where.CategoryId = {
                              [Op.eq] : CategoryId
                      }
                  }
      
                  return await Product.findAll(options);
    }

  }
  Product.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Product Name is empty! please fill product name'
        },
        notEmpty : {
          msg : 'Product Name is empty! please fill product name'
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Price is empty! please fill price',
        },
        notNull : {
          msg : 'Price is empty! please fill price'
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
          msg : 'Stock is empty! Please fill stock',
        },
        notNull : {
          msg : 'Stock is empty! Please fill stock'
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
          msg : 'Description is empty! please fill description',
        },
        notNull : {
          msg : 'Description is empty! please fill description'
        }
      }
    },
    imageUrl: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          msg : 'Image Url is empty! please fill image url',
        },
        notNull : {
          msg : 'Image Url is empty! please fill image url'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    isActive : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });

  Product.beforeCreate((product) => {
    product.isActive = true;
  })

  return Product;
};