'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Products', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        uuid: {
          allowNull: false,
          type: Sequelize.UUID,
          default: Sequelize.UUID
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        isActive: {
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
        productType: {
          allowNull: false,
          type: Sequelize.STRING(1)
        },
        ProductCategoryId: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'ProductCategories'
            },
            key: 'id'
          },
          allowNull: false
        },
      }, { trx });

      await queryInterface.addIndex(
        'Products',
        ['isActive', 'value', 'name'],
        {
          name: 'products_activeproducts',
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
    await queryInterface.dropTable('Products');
  }
};
