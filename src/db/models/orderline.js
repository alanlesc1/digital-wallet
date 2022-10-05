'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MOrderLine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  MOrderLine.init({
    C_OrderLine_ID: {
      type: DataTypes.INTEGER,
      field: 'c_orderline_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_OrderLine_UU: {
      type: DataTypes.UUIDV4,
      field: 'c_orderline_uu',
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
    M_Product_ID: {
      type: DataTypes.INTEGER,
      field: 'm_product_id',
      references: {
        model: 'MProduct',
        key: 'm_product_id'
      }
    },
    qtyEntered: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'qtyentered',
      allowNull: false
    },
    priceActual: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'priceactual',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MOrderLine',
    tableName: 'c_orderline',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MOrderLine;
};