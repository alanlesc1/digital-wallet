'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MEventMerchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MEventMerchant.belongsTo(models.MEvent, {
        foreignKey: 'C_Event_ID'
      });
      MEventMerchant.belongsTo(models.MMerchant, {
        foreignKey: 'C_Merchant_ID'
      });
    }
  }
  MEventMerchant.init({
    C_EventMerchant_ID: {
      type: DataTypes.INTEGER,
      field: 'c_eventmerchant_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_EventMerchant_UU: {
      type: DataTypes.UUID,
      field: 'c_eventmerchant_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
      allowNull: false,
      defaultValue: true
    },
    C_Event_ID: {
      type: DataTypes.INTEGER,
      field: 'c_event_id',
      references: {
        model: 'c_event',
        key: 'c_event_id'
      }
    },
    C_Merchant_ID: {
      type: DataTypes.INTEGER,
      field: 'c_merchant_id',
      references: {
        model: 'c_merchant',
        key: 'c_merchant_id'
      }
    },
  }, {
    sequelize,
    modelName: 'MEventMerchant',
    tableName: 'c_eventmerchant',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MEventMerchant;
};