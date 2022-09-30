'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('UserWallets', {
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
        name: {
          allowNull: true,
          type: Sequelize.STRING(120)
        },
        paymentMethod: {
          allowNull: false,
          type: Sequelize.STRING(3)
        },
        cardFirstDigits: {
          allowNull: false,
          type: Sequelize.STRING(6)
        },
        cardLastDigits: {
          allowNull: false,
          type: Sequelize.STRING(4)
        },
        cardBrand: {
          allowNull: false,
          type: Sequelize.STRING(60)
        },
        cardHolderName: {
          allowNull: false,
          type: Sequelize.STRING(120)
        },
        cardHolderDocNo: {
          allowNull: false,
          type: Sequelize.STRING(14)
        },
        cardExpMonth: {
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER
        },
        cardExpYear: {
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER
        },
        billingLocationId: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'Locations'
            },
            key: 'id'
          },
          allowNull: true
        },
        pagarmeCard: {
          allowNull: true,
          type: Sequelize.STRING(60)
        },
      }, { trx });

      await queryInterface.addIndex(
        'UserWallets',
        ['isActive', 'UserId'],
        {
          name: 'userwallets_activewallets',
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
    await queryInterface.dropTable('UserWallets');
  }
};
