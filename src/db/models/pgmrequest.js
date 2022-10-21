'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MPGMRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MPGMRequest.belongsTo(models.MTable, {
        foreignKey: 'AD_Table_ID'
      });
    }
  }
  MPGMRequest.init({
    PGM_Request_ID: {
      type: DataTypes.INTEGER,
      field: 'pgm_request_id',
      primaryKey: true,
      autoIncrement: true
    },
    PGM_Request_UU: {
      type: DataTypes.UUID,
      field: 'pgm_request_uu',
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'isactive',
      allowNull: false,
      defaultValue: true
    },
    requestDate: {
      field: 'requestdate',
      allowNull: false,
      type: DataTypes.DATE
    },
    method: {
      type: DataTypes.STRING(6),
      allowNull: false,
      validate: {
        isIn: {
          args: [[
            'POST',
            'GET',
            'PUT',
            'DELETE',
          ]],
          msg: "Must be one of 'POST', 'GET', 'PUT', 'DELETE'"
        }
      }
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    jsonRequest: {
      type: DataTypes.TEXT,
      field: 'jsonrequest',
      allowNull: false,
    },
    jsonResponse: {
      type: DataTypes.TEXT,
      field: 'jsonresponse',
      allowNull: true,
    },
    AD_Table_ID: {
      type: DataTypes.INTEGER,
      field: 'ad_table_id',
      references: {
        model: 'ad_table',
        key: 'ad_table_id'
      },
      allowNull: true,
    },
    Record_ID: {
      type: DataTypes.INTEGER,
      field: 'record_id',
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'MPGMRequest',
    tableName: 'pgm_request',
    createdAt: 'created',
    updatedAt: 'updated',
  });
  return MPGMRequest;
};