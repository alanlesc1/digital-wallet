'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('c_userqrcode', {
        c_userqrcode_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        c_userqrcode_uu: {
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
        c_user_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'c_user'
            },
            key: 'c_user_id'
          },
          allowNull: false
        },
      }, { trx });

      await queryInterface.addIndex(
        'c_userqrcode',
        ['isactive', 'c_user_id'],
        {
          name: 'c_userqrcode_activeuser',
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
    await queryInterface.dropTable('c_userqrcode');
  }
};