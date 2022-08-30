'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING(120)
        },
        email: {
          allowNull: false,
          unique: true,
          type: Sequelize.STRING(255),
          validate: {
            isEmail: true
          }
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING(64)
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { trx });

      await queryInterface.addIndex(
        'Users',
        ['email'],
        { 
          name: 'users_email',
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
    await queryInterface.dropTable('Users');
  }
};
