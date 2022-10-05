'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MPayment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  MPayment.init({
    C_Payment_ID: {
      type: DataTypes.INTEGER,
      field: 'c_payment_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_Payment_UU: {
      type: DataTypes.UUIDV4,
      field: 'c_payment_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
      allowNull: false,
      defaultValue: true
    },
    C_Order_ID: {
      type: DataTypes.INTEGER,
      field: 'c_order_id',
      references: {
        model: 'MOrder',
        key: 'c_order_id'
      }
    },
    isReceipt: {
      type: DataTypes.BOOLEAN,
      field: 'isreceipt',
      allowNull: false,
      defaultValue: true
    },
    payAmt: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'payamt',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MPayment',
    tableName: 'c_payment',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MPayment;
};