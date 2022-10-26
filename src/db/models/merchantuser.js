'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MMerchantUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MMerchantUser.belongsTo(models.MMerchant, {
        foreignKey: 'C_Merchant_ID'
      });
      MMerchantUser.belongsTo(models.MUser, {
        foreignKey: 'C_User_ID'
      });
    }
  }
  MMerchantUser.init({
    C_MerchantUser_ID: {
      type: DataTypes.INTEGER,
      field: 'c_merchantuser_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_MerchantUser_UU: {
      type: DataTypes.UUID,
      field: 'c_merchantuser_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
      allowNull: false,
      defaultValue: true
    },
    C_Merchant_ID: {
      type: DataTypes.INTEGER,
      field: 'c_merchant_id',
      references: {
        model: 'c_merchant',
        key: 'c_merchant_id'
      }
    },
    C_User_ID: {
      type: DataTypes.INTEGER,
      field: 'c_user_id',
      references: {
        model: 'c_user',
        key: 'c_user_id'
      }
    },
  }, {
    sequelize,
    modelName: 'MMerchantUser',
    tableName: 'c_merchantuser',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MMerchantUser;
};