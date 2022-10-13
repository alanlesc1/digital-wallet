'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('c_userfcmtoken', {
        c_userfcmtoken_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        c_userfcmtoken_uu: {
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
        token: {
          allowNull: false,
          type: Sequelize.STRING(255)
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
        lastseen: {
          allowNull: false,
          type: Sequelize.DATE
        },
      }, { trx });

      await queryInterface.addIndex(
        'c_userfcmtoken',
        ['isactive', 'c_user_id'],
        {
          name: 'c_userfcmtoken_activetokens',
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
    await queryInterface.dropTable('c_userfcmtoken');
  }
};
