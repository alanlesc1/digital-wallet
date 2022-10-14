'use strict';

const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      const schema = {
        m_productcategory_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        m_productcategory_uu: {
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
        value: {
          allowNull: true,
          type: Sequelize.STRING(60)
        },
        name: {
          allowNull: true,
          type: Sequelize.STRING(255)
        },
        parent_productcategory_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'm_productcategory'
            },
            key: 'm_productcategory_id'
          },
          allowNull: true
        },
      };

      await queryInterface.createTable('m_productcategory', schema, { trx });

      await queryInterface.bulkInsert('ad_table', [
        {
          ad_table_uu: uuidv4(),
          created: new Date(),
          updated: new Date(),
          tablename: 'm_productcategory'
        },
      ], { trx });

      await trx.commit();
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('m_productcategory');
  }
};
