'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('c_userwallet', {
        c_userwallet_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        c_userwallet_uu: {
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
        name: {
          allowNull: true,
          type: Sequelize.STRING(120)
        },
        paymentmethod: {
          allowNull: false,
          type: Sequelize.STRING(3)
        },
        cardfirstdigits: {
          allowNull: false,
          type: Sequelize.STRING(6)
        },
        cardlastdigits: {
          allowNull: false,
          type: Sequelize.STRING(4)
        },
        cardbrand: {
          allowNull: false,
          type: Sequelize.STRING(60)
        },
        cardholdername: {
          allowNull: false,
          type: Sequelize.STRING(120)
        },
        cardholderdocno: {
          allowNull: false,
          type: Sequelize.STRING(14)
        },
        cardexpmonth: {
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER
        },
        cardexpyear: {
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER
        },
        billing_location_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'c_location'
            },
            key: 'c_location_id'
          },
          allowNull: true
        },
        pm_cardid: {
          allowNull: true,
          type: Sequelize.STRING(60)
        },
      }, { trx });

      await queryInterface.addIndex(
        'c_userwallet',
        ['isactive', 'c_user_id'],
        {
          name: 'c_userwallet_activewallets',
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
    await queryInterface.dropTable('c_userwallet');
  }
};
