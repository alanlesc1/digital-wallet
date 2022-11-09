'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MPriceList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MPriceList.hasMany(models.MEvent, {
        foreignKey: 'M_PriceList_ID',
      });
      MPriceList.hasMany(models.MProductPrice, {
        foreignKey: 'M_PriceList_ID'
      });
    }
  }
  MPriceList.init({
    M_PriceList_ID: {
      type: DataTypes.INTEGER,
      field: 'm_pricelist_id',
      primaryKey: true,
      autoIncrement: true
    },
    M_PriceList_UU: {
      type: DataTypes.UUID,
      field: 'm_pricelist_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
      allowNull: false,
      defaultValue: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'MPriceList',
    tableName: 'm_pricelist',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MPriceList;
};
