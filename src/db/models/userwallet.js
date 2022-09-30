'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserWallet.belongsTo(models.User);
      UserWallet.belongsTo(models.Location, {
        foreignKey: {
          name: 'billingLocationId'
        }
      });
    }
  }
  UserWallet.init({
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
    name: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    paymentMethod: {
      type: DataTypes.STRING(3),
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
      allowNull: false,
    },
    cardLastDigits: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    cardBrand: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    cardHolderName: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    cardHolderDocNo: {
      type: DataTypes.STRING(14),
      allowNull: false,
    },
    cardExpMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cardExpYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    billingLocationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Locations',
        key: 'id'
      },
      allowNull: true,
    },
    pagarmeCard: {
      type: DataTypes.STRING(60),
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'UserWallet',
  });
  return UserWallet;
};