'use strict';

const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      const schema = {
        c_user_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        c_user_uu: {
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
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
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
        verificationcode: {
          allowNull: true,
          type: Sequelize.STRING(4)
        },
        verificationcodeexp: {
          allowNull: true,
          type: Sequelize.DATE
        },
        isuserverified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        }
      };

      await queryInterface.createTable('c_user', schema, { trx });

      await queryInterface.bulkInsert('ad_table', [
        {
          ad_table_uu: uuidv4(),
          created: new Date(),
          updated: new Date(),
          tablename: 'c_user'
        },
      ], { trx });

      await queryInterface.addIndex(
        'c_user',
        ['email'],
        {
          name: 'c_user_email',
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
    await queryInterface.dropTable('c_user');
  }
};
