'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MProductPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MProductPrice.belongsTo(models.MPriceList, {
        foreignKey: 'M_PriceList_ID'
      });
      MProductPrice.belongsTo(models.MProduct, {
        foreignKey: 'M_Product_ID'
      });
    }
  }
  MProductPrice.init({
    M_ProductPrice_ID: {
      type: DataTypes.INTEGER,
      field: 'm_productprice_id',
      primaryKey: true,
      autoIncrement: true
    },
    M_ProductPrice_UU: {
      type: DataTypes.UUID,
      field: 'm_productprice_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
      allowNull: false,
      defaultValue: true
    },
    M_PriceList_ID: {
      type: DataTypes.INTEGER,
      field: 'm_pricelist_id',
      references: {
        model: 'm_pricelist',
        key: 'm_pricelist_id'
      }
    },
    M_Product_ID: {
      type: DataTypes.INTEGER,
      field: 'm_product_id',
      references: {
        model: 'm_product',
        key: 'm_product_id'
      }
    },
    listPrice: {
      type: DataTypes.DECIMAL(10, 2),
      field: 'listprice',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'MProductPrice',
    tableName: 'm_productprice',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MProductPrice;
};