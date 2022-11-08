'use strict';

import { generatePublicId } from '../../helpers/publicId';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MProduct.belongsTo(models.MProductCategory, {
        foreignKey: 'M_ProductCategory_ID'
      });
      MProduct.hasMany(models.MOrderLine, {
        foreignKey: 'M_Product_ID'
      });
    }
  }
  MProduct.init({
    M_Product_ID: {
      type: DataTypes.INTEGER,
      field: 'm_product_id',
      primaryKey: true,
      autoIncrement: true
    },
    M_Product_UU: {
      type: DataTypes.UUID,
      field: 'm_product_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
      allowNull: false,
      defaultValue: true,
    },
    publicId: {
      type: DataTypes.STRING(12),
      field: 'publicid',
      allowNull: false,
      unique: true,
      defaultValue: function() {
        return generatePublicId();
      },
    },
    value: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    productType: {
      type: DataTypes.STRING(1),
      field: 'producttype',
      allowNull: false,
      validate: {
        isIn: {
          args: [[
            'I', // Item
            'S', // Service
          ]],
          msg: "Must be one of 'I', 'S'"
        }
      }
    },
    M_ProductCategory_ID: {
      type: DataTypes.INTEGER,
      field: 'm_productcategory_id',
      references: {
        model: 'm_productcategory',
        key: 'm_productcategory_id'
      },
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'MProduct',
    tableName: 'm_product',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MProduct;
};
