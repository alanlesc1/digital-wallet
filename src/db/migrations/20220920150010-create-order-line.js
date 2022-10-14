'use strict';

const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      const schema = {
        c_orderline_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        c_orderline_uu: {
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
        c_order_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'c_order'
            },
            key: 'c_order_id'
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
        qtyentered: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
        priceactual: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
      };

      await queryInterface.createTable('c_orderline', schema, { trx });

      await queryInterface.bulkInsert('ad_table', [
        {
          ad_table_uu: uuidv4(),
          created: new Date(),
          updated: new Date(),
          tablename: 'c_orderline'
        },
      ], { trx });

      await queryInterface.addIndex(
        'c_orderline',
        ['isactive', 'c_order_id'],
        {
          name: 'c_orderline_oforder',
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
    await queryInterface.dropTable('c_orderline');
  }
};
