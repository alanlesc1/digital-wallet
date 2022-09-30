'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserRole.belongsTo(models.User);
    }
  }
  UserRole.init({
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
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
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
    modelName: 'UserRole',
  });
  return UserRole;
};