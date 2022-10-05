'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MUserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MUserRole.belongsTo(models.MUser, {
        foreignKey: 'C_User_ID'
      });
    }
  }
  MUserRole.init({
    C_UserRole_ID: {
      type: DataTypes.INTEGER,
      field: 'c_userrole_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_UserRole_UU: {
      type: DataTypes.UUIDV4,
      field: 'c_userrole_uu',
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
    },
    role: {
      type: DataTypes.STRING(3),
      allowNull: false,
      validate: {
        isIn: {
          args: [[
            'TPM', // TrackPay Manager
            'PRO', // Event Producer
            'VEN', // Vendor
            'BUY', // Buyer
            'POS', // POS (Point of Sale) User
          ]],
          msg: "Must be one of 'TPM', 'PRO', 'VEN', 'BUY', 'POS'"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'MUserRole',
    tableName: 'c_userrole',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MUserRole;
};