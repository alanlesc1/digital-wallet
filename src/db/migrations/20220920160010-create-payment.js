'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Payments', {
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
        OrderId: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'Orders'
            },
            key: 'id'
          },
          allowNull: false
        },
        isReceipt: {
          type: Sequelize.BOOLEAN
        },
        payAmt: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
      }, { trx });

      await queryInterface.addIndex(
        'Payments',
        ['isActive', 'OrderId'],
        {
          name: 'payments_oforder',
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
    await queryInterface.dropTable('Payments');
  }
};
