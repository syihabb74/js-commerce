'use strict';

const {hash} = require('../helpers/helper')
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
      User.hasOne(models.UserProfile, {foreignKey: 'UserId'});
      User.hasMany(models.Product, {foreignKey : 'UserId'});
      User.hasMany(models.Order, {foreignKey : 'UserId'})
    }
  }
  User.init({
    email: {
      type :DataTypes.STRING,
      allowNull : false,
      validate : {
        isEmail : {
          msg : 'Invalid email format'
        }
        ,
        notNull : {
          msg : 'Email is empty please fill with your Email'
        },
        notEmpty : {
          msg : 'Email is empty please fill with your Email'
        },
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
    role: DataTypes.STRING,
    balance : DataTypes.INTEGER,
    isActive : DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });


  User.beforeCreate((usr) => {
    const hashing = hash(usr.password)
    usr.password = hashing
    usr.role = 'user';
    usr.balance = 0;
    const randomId = Math.floor(Math.random() * 100000);
    if (!usr.username) {
      usr.username = `Anon${randomId}`
    }
  })


  User.afterCreate(async (usr) => {
     await usr.createUserProfile()
  })

  return User;
};