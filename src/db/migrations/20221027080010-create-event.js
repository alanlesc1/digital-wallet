'use strict';

const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      const schema = {
        c_event_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        c_event_uu: {
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
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        publicid: {
          allowNull: false,
          type: Sequelize.STRING(12),
          unique: true,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING(120)
        },
        description: {
          allowNull: true,
          type: Sequelize.STRING(2000)
        },
        startdate: {
          allowNull: false,
          type: Sequelize.DATE
        },
        enddate: {
          allowNull: false,
          type: Sequelize.DATE
        },
      };

      await queryInterface.createTable('c_event', schema, { trx });

      await queryInterface.bulkInsert('ad_table', [
        {
          ad_table_uu: uuidv4(),
          created: new Date(),
          updated: new Date(),
          tablename: 'c_event'
        },
      ], { trx });

      await trx.commit();
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('c_event');
  }
};
