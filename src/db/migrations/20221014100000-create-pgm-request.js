'use strict';

const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      const schema = {
        pgm_request_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        pgm_request_uu: {
          allowNull: false,
          type: Sequelize.UUID,
          default: Sequelize.UUID
        },
        created: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated: {
          allowNull: false,
          type: Sequelize.DATE
        },
        isactive: {
          type: Sequelize.BOOLEAN
        },
        requestdate: {
          allowNull: false,
          type: Sequelize.DATE
        },
        jsonrequest: {
          allowNull: false,
          type: Sequelize.TEXT
        },
        jsonresponse: {
          allowNull: true,
          type: Sequelize.TEXT
        },
        ad_table_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'ad_table'
            },
            key: 'ad_table_id'
          },
          allowNull: true
        },
        record_id: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: true
        },
      };

      await queryInterface.createTable('pgm_request', schema, { trx });

      await queryInterface.bulkInsert('ad_table', [
        {
          ad_table_uu: uuidv4(),
          created: new Date(),
          updated: new Date(),
          tablename: 'pgm_request'
        },
      ], { trx });

      await queryInterface.addIndex(
        'pgm_request',
        ['ad_table_id', 'record_id'],
        {
          name: 'pgm_request_recordrequests',
          indexType: 'BTREE',
          trx
        }
      );

      await trx.commit();
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pgm_request');
  }
};