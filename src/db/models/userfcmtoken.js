'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MUserFcmToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MUserFcmToken.belongsTo(models.MUser, {
        foreignKey: 'C_User_ID'
      });
    }
  }
  MUserFcmToken.init({
    C_UserFcmToken_ID: {
      type: DataTypes.INTEGER,
      field: 'c_userfcmtoken_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_UserFcmToken_UU: {
      type: DataTypes.UUID,
      field: 'c_userfcmtoken_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
      allowNull: false,
      defaultValue: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    C_User_ID: {
      type: DataTypes.INTEGER,
      field: 'c_user_id',
      references: {
        model: 'c_user',
        key: 'c_user_id'
      }
    },
    lastSeen: {
      field: 'lastseen',
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'MUserFcmToken',
    tableName: 'c_userfcmtoken',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MUserFcmToken;
};