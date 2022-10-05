'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('c_payment', {
        c_payment_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        c_payment_uu: {
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
        isreceipt: {
          type: Sequelize.BOOLEAN
        },
        payamt: {
          type: Sequelize.DataTypes.DECIMAL(10, 2),
          allowNull: false
        },
      }, { trx });

      await queryInterface.addIndex(
        'c_payment',
        ['isactive', 'c_order_id'],
        {
          name: 'c_payment_oforder',
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
    await queryInterface.dropTable('c_payment');
  }
};
