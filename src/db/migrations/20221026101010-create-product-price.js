'use strict';

const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      const schema = {
        m_productprice_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        m_productprice_uu: {
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
        m_pricelist_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'm_pricelist'
            },
            key: 'm_pricelist_id'
          },
          allowNull: false
        },
        m_product_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'm_product'
            },
            key: 'm_product_id'
          },
          allowNull: false
        },
        listprice: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
      };

      await queryInterface.createTable('m_productprice', schema, { trx });

      await queryInterface.bulkInsert('ad_table', [
        {
          ad_table_uu: uuidv4(),
          created: new Date(),
          updated: new Date(),
          tablename: 'm_productprice'
        },
      ], { trx });

      await queryInterface.addConstraint('m_productprice', {
        fields: ['m_pricelist_id', 'm_product_id'],
        type: 'unique',
        name: 'm_productprice_unique_product',
        trx
      });

      await queryInterface.addIndex(
        'm_productprice',
        ['isactive', 'm_pricelist_id', 'm_product_id'],
        {
          name: 'm_productprice_product',
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
    await queryInterface.dropTable('m_productprice');
  }
};
