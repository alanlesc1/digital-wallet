'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MUserPaymentMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MUserPaymentMethod.belongsTo(models.MUser, {
        foreignKey: 'C_User_ID'
      });
      MUserPaymentMethod.belongsTo(models.MLocation, {
        foreignKey: 'billing_Location_ID'
      });
    }
  }
  MUserPaymentMethod.init({
    C_UserPaymentMethod_ID: {
      type: DataTypes.INTEGER,
      field: 'c_userpaymentmethod_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_UserPaymentMethod_UU: {
      type: DataTypes.UUID,
      field: 'c_userpaymentmethod_uu',
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
      allowNull: true,
    },
    cardLastDigits: {
      type: DataTypes.STRING(4),
      field: 'cardlastdigits',
      allowNull: true,
    },
    cardBrand: {
      type: DataTypes.STRING(60),
      field: 'cardbrand',
      allowNull: true,
    },
    cardHolderName: {
      type: DataTypes.STRING(120),
      field: 'cardholdername',
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
    cardHolderDocumentType: {
      type: DataTypes.STRING(4),
      field: 'cardholderdocumenttype',
      allowNull: false,
      validate: {
        isIn: {
          args: [[
            'CPF',
            'CNPJ',
          ]],
          msg: "Must be one of 'CPF', 'CNPJ'"
        }
      }
    },
    cardHolderDocumentNo: {
      type: DataTypes.STRING(14),
      field: 'cardholderdocumentno',
      allowNull: false,
    },
    billing_Location_ID: {
      type: DataTypes.INTEGER,
      field: 'billing_location_id',
      references: {
        model: 'c_location',
        key: 'c_location_id'
      },
      allowNull: false,
    },
    PGM_CardId: {
      type: DataTypes.STRING(60),
      field: 'pgm_cardid',
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'MUserPaymentMethod',
    tableName: 'c_userpaymentmethod',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MUserPaymentMethod;
};