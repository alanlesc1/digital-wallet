'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MOrder.belongsTo(models.MUser, {
        foreignKey: 'vendor_User_ID'
      });
      MOrder.belongsTo(models.MUser, {
        foreignKey: 'buyer_User_ID'
      });
      MOrder.hasMany(models.MOrderLine, {
        foreignKey: 'C_Order_ID'
      });
      MOrder.hasMany(models.MPayment, {
        foreignKey: 'C_Order_ID'
      });
    }
  }
  MOrder.init({
    C_Order_ID: {
      type: DataTypes.INTEGER,
      field: 'c_order_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_Order_UU: {
      type: DataTypes.UUID,
      field: 'c_order_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
      allowNull: false,
      defaultValue: true
    },
    isSOTrx: {
      type: DataTypes.BOOLEAN,
      field: 'issotrx',
      allowNull: false,
      defaultValue: true
    },
    vendor_User_ID: {
      type: DataTypes.INTEGER,
      field: 'vendor_user_id',
      references: {
        model: 'c_user',
        key: 'c_user_id'
      }
    },
    buyer_User_ID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'c_user',
        key: 'c_user_id'
      }
    }
  }, {
    sequelize,
    modelName: 'MOrder',
    tableName: 'c_order',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MOrder;
};