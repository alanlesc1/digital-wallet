'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('UserRoles', {
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
        UserId: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'Users'
            },
            key: 'id'
          },
          allowNull: false
        },
        role: {
          allowNull: false,
          type: Sequelize.STRING(3)
        },
      }, { trx });

      await queryInterface.addIndex(
        'UserRoles',
        ['isActive', 'UserId'],
        {
          name: 'userroles_activeroles',
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
    await queryInterface.dropTable('UserRoles');
  }
};
