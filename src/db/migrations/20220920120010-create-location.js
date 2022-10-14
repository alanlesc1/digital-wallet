'use strict';

const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      const schema = {
        c_location_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        c_location_uu: {
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
        line1: {
          allowNull: true,
          type: Sequelize.STRING(120)
        },
        line2: {
          allowNull: true,
          type: Sequelize.STRING(120)
        },
        city: {
          allowNull: true,
          type: Sequelize.STRING(60)
        },
        state: {
          allowNull: true,
          type: Sequelize.STRING(2)
        },
        country: {
          allowNull: true,
          type: Sequelize.STRING(60)
        },
        zipcode: {
          allowNull: true,
          type: Sequelize.STRING(8)
        },
      };

      await queryInterface.createTable('c_location', schema, { trx });

      await queryInterface.bulkInsert('ad_table', [
        {
          ad_table_uu: uuidv4(),
          created: new Date(),
          updated: new Date(),
          tablename: 'c_location'
        },
      ], { trx });

      await trx.commit();
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('c_location');
  }
};
