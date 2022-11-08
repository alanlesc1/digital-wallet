'use strict';

import { generatePublicId } from '../../helpers/publicId';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MEvent.hasMany(models.MEventMerchant, {
        foreignKey: 'C_Event_ID',
      });
    }
  }
  MEvent.init({
    C_Event_ID: {
      type: DataTypes.INTEGER,
      field: 'c_event_id',
      primaryKey: true,
      autoIncrement: true
    },
    C_Event_UU: {
      type: DataTypes.UUID,
      field: 'c_event_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
      allowNull: false,
      defaultValue: true,
    },
    publicId: {
      type: DataTypes.STRING(12),
      field: 'publicid',
      allowNull: false,
      unique: true,
      defaultValue: function() {
        return generatePublicId();
      },
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
      validate: {
        min: 5
      }
    },
    description: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    startDate: {
      field: 'startdate',
      allowNull: false,
      type: DataTypes.DATE
    },
    endDate: {
      field: 'enddate',
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'MEvent',
    tableName: 'c_event',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MEvent;
};
