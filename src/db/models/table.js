'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MTable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MTable.hasMany(models.MPGMRequest, {
        foreignKey: 'AD_Table_ID'
      });
    }
  }
  MTable.init({
    AD_Table_ID: {
      type: DataTypes.INTEGER,
      field: 'ad_table_id',
      primaryKey: true,
      autoIncrement: true
    },
    AD_Table_UU: {
      type: DataTypes.UUID,
      field: 'ad_table_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
      allowNull: false,
      defaultValue: true,
    },
    tableName: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'MTable',
    tableName: 'ad_table',
    createdAt: 'created',
    updatedAt: 'updated'
  });
  return MTable;
};
