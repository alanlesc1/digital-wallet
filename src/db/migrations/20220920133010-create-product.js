'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('m_product', {
        m_product_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        m_product_uu: {
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
        producttype: {
          allowNull: false,
          type: Sequelize.STRING(1)
        },
        m_productcategory_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'm_productcategory'
            },
            key: 'm_productcategory_id'
          },
          allowNull: false
        },
      }, { trx });

      await queryInterface.addIndex(
        'm_product',
        ['isactive', 'value', 'name'],
        {
          name: 'm_product_activeproducts',
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
    await queryInterface.dropTable('m_product');
  }
};
