'use strict';
const bcryptjs = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type :DataTypes.STRING,
      unique : true,
      allowNull : false,
      validate : {
        isEmail : true,
        notNull : {
          msg : 'Email is empty please fill with your Email'
        },
        notEmpty : {
          msg : 'Email is empty please fill with your Email'
        },
        len : {
          args : [5,255],
          msg : 'Something wrong with your input'
        }
      }
    },
    password: {
      type : DataTypes.STRING, 
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Please fill your password'
        },
        notEmpty : {
          msg : 'please fill your password'
        },
        len : {
          args : [8,255],
          msg : 'Minimum password is 8 character'
        }
      }
    },
    username: {
      type : DataTypes.STRING,
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });


  User.beforeCreate((usr) => {
    usr.role = 'user';
    usr.balance = 0;
    const randomId = Math.floor(Math.random() * 100000);
    if (!usr.username) {
      usr.username = `Anon${randomId}`
    }
  })


  return User;
};