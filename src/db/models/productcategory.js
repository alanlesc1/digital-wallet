'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MProductCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  MProductCategory.init({
    M_ProductCategory_ID: {
      type: DataTypes.INTEGER,
      field: 'm_productcategory_id',
      primaryKey: true,
      autoIncrement: true
    },
    M_ProductCategory_UU: {
      type: DataTypes.UUIDV4,
      field: 'm_productcategory_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
      allowNull: false,
      defaultValue: true,
    },
    value: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    parent_ProductCategory_ID: {
      type: DataTypes.INTEGER,
      field: 'parent_productcategory_id',
      allowNull: true,
      references: {
        model: 'MProductCategory',
        key: 'm_productcategory_id'
      }
    },
  }, {
    sequelize,
    modelName: 'ProductCategory',
    tableName: 'm_productcategory',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MProductCategory;
};
