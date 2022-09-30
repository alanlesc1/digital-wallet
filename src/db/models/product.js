'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.ProductCategory);
    }
  }
  Product.init({
    uuid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
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
    productType: {
      type: DataTypes.STRING(1),
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
    ProductCategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductCategories',
        key: 'id'
      },
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
