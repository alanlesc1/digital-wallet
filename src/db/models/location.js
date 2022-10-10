'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MLocation.hasMany(models.MUserWallet, {
        foreignKey: 'billing_Location_ID',
      });
    }
  }
  MLocation.init({
    C_Location_ID: {
      type: DataTypes.INTEGER,
      field: 'c_location_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_Location_UU: {
      type: DataTypes.UUID,
      field: 'c_location_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
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
      field: 'zipcode',
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'MLocation',
    tableName: 'c_location',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MLocation;
};