'use strict';

import { generatePublicId } from '../../helpers/publicId';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MMerchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MMerchant.hasMany(models.MMerchantUser, {
        foreignKey: 'C_Merchant_ID',
      });
    }
  }
  MMerchant.init({
    C_Merchant_ID: {
      type: DataTypes.INTEGER,
      field: 'c_merchant_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_Merchant_UU: {
      type: DataTypes.UUID,
      field: 'c_merchant_uu',
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
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        min: 5
      }
    },
    documentType: {
      type: DataTypes.STRING(4),
      field: 'documenttype',
      allowNull: true,
      validate: {
        isIn: {
          args: [[
            'CPF',
            'CNPJ',
          ]],
          msg: "Must be one of 'CPF', 'CNPJ'"
        }
      }
    },
    documentNo: {
      type: DataTypes.STRING(14),
      field: 'documentno',
      unique: true,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'MMerchant',
    tableName: 'c_merchant',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MMerchant;
};
