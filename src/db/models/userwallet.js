'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MUserWallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MUserWallet.belongsTo(models.MUser, {
        foreignKey: 'C_User_ID'
      });
      MUserWallet.belongsTo(models.MLocation, {
        foreignKey: 'billing_Location_ID'
      });
    }
  }
  MUserWallet.init({
    C_UserWallet_ID: {
      type: DataTypes.INTEGER,
      field: 'c_userwallet_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_UserWallet_UU: {
      type: DataTypes.UUID,
      field: 'c_userwallet_uu',
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
        model: 'c_user',
        key: 'c_user_id'
      }
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.STRING(3),
      field: 'paymentmethod',
      allowNull: false,
      validate: {
        isIn: {
          args: [[
            'DRC', // Debit Card
            'CRC', // Credit Card
          ]],
          msg: "Must be one of 'DRC', 'CRC'"
        }
      }
    },
    cardFirstDigits: {
      type: DataTypes.STRING(6),
      field: 'cardfirstdigits',
      allowNull: false,
    },
    cardLastDigits: {
      type: DataTypes.STRING(4),
      field: 'cardlastdigits',
      allowNull: false,
    },
    cardBrand: {
      type: DataTypes.STRING(60),
      field: 'cardbrand',
      allowNull: false,
    },
    cardHolderName: {
      type: DataTypes.STRING(120),
      field: 'cardholdername',
      allowNull: false,
    },
    cardHolderDocNo: {
      type: DataTypes.STRING(14),
      field: 'cardholderdocno',
      allowNull: false,
    },
    cardExpMonth: {
      type: DataTypes.INTEGER,
      field: 'cardexpmonth',
      allowNull: false,
    },
    cardExpYear: {
      type: DataTypes.INTEGER,
      field: 'cardexpyear',
      allowNull: false,
    },
    billing_Location_ID: {
      type: DataTypes.INTEGER,
      field: 'billing_location_id',
      references: {
        model: 'c_location',
        key: 'c_location_id'
      },
      allowNull: true,
    },
    PM_CardId: {
      type: DataTypes.STRING(60),
      field: 'pm_cardid',
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'MUserWallet',
    tableName: 'c_userwallet',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MUserWallet;
};