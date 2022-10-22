'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MUser.hasMany(models.MUserRole, {
        foreignKey: 'C_User_ID',
      });
      MUser.hasMany(models.MUserFcmToken, {
        foreignKey: 'C_User_ID',
      });
      MUser.hasMany(models.MUserQRCode, {
        foreignKey: 'C_User_ID',
      });
      MUser.hasMany(models.MUserWallet, {
        foreignKey: 'C_User_ID',
      });
      MUser.hasMany(models.MOrder, {
        foreignKey: 'vendor_User_ID'
      });
      MUser.hasMany(models.MOrder, {
        foreignKey: 'buyer_User_ID'
      });
    }
  }
  MUser.init({
    C_User_ID: {
      type: DataTypes.INTEGER,
      field: 'c_user_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_User_UU: {
      type: DataTypes.UUID,
      field: 'c_user_uu',
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
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        min: 5
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    verificationCode: {
      field: 'verificationcode',
      allowNull: true,
      type: DataTypes.STRING(4)
    },
    verificationCodeExp: {
      field: 'verificationcodeexp',
      allowNull: true,
      type: DataTypes.DATE
    },
    isUserVerified: {
      type: DataTypes.BOOLEAN,
      field: 'isuserverified',
      allowNull: false,
      defaultValue: false,
    },
    phone: {
      type: DataTypes.STRING(40),
      allowNull: true,
    },
    PGM_CustomerId: {
      type: DataTypes.STRING(60),
      field: 'pgm_customerid',
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'MUser',
    tableName: 'c_user',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MUser;
};
