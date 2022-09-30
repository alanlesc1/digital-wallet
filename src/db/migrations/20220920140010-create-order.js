'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Orders', {
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
        isSOTrx: {
          type: Sequelize.BOOLEAN
        },
        VendorUserId: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'Users'
            },
            key: 'id'
          },
          allowNull: false
        },
        BuyerUserId: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'Users'
            },
            key: 'id'
          },
          allowNull: false
        },
      }, { trx });

      await queryInterface.addIndex(
        'Orders',
        ['isActive', 'isSOTrx', 'VendorUserId', 'BuyerUserId'],
        {
          name: 'orders_userorders',
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
    await queryInterface.dropTable('Orders');
  }
};
