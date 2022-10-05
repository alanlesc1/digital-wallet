'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MUserQRCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  MUserQRCode.init({
    C_UserQrCode_ID: {
      type: DataTypes.INTEGER,
      field: 'c_userqrcode_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_UserQrCode_UU: {
      type: DataTypes.UUIDV4,
      field: 'c_userqrcode_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
      allowNull: false,
      defaultValue: true
    },
    C_User_ID: {
      type: DataTypes.INTEGER,
      field: 'c_user_id',
      references: {
        model: 'MUser',
        key: 'c_user_id'
      }
    }
  }, {
    sequelize,
    modelName: 'MUserQRCode',
    tableName: 'c_userqrcode',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MUserQRCode;
};