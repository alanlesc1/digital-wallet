'use strict';

const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      const schema = {
        c_eventmerchant_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        c_eventmerchant_uu: {
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
        c_event_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'c_event'
            },
            key: 'c_event_id'
          },
          allowNull: false
        },
        c_merchant_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'c_merchant'
            },
            key: 'c_merchant_id'
          },
          allowNull: false
        },
      };

      await queryInterface.createTable('c_eventmerchant', schema, { trx });

      await queryInterface.bulkInsert('ad_table', [
        {
          ad_table_uu: uuidv4(),
          created: new Date(),
          updated: new Date(),
          tablename: 'c_eventmerchant'
        },
      ], { trx });

      await trx.commit();
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('c_eventmerchant');
  }
};
