'use strict';

const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      const schema = {
        c_merchant_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        c_merchant_uu: {
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
        documenttype: {
          type: Sequelize.STRING(4),
          allowNull: true,
        },
        documentno: {
          type: Sequelize.STRING(14),
          allowNull: true,
          unique: true,
        },
      };

      await queryInterface.createTable('c_merchant', schema, { trx });

      await queryInterface.bulkInsert('ad_table', [
        {
          ad_table_uu: uuidv4(),
          created: new Date(),
          updated: new Date(),
          tablename: 'c_merchant'
        },
      ], { trx });

      await trx.commit();
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('c_merchant');
  }
};
