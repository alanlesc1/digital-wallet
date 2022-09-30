'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Location.hasOne(models.UserWallet, {
        foreignKey: {
          name: 'billingLocationId'
        }
      });
    }
  }
  Location.init({
    uuid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    line1: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    line2: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Location',
  });
  return Location;
};