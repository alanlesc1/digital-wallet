'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('Locations', {
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
        line1: {
          allowNull: true,
          type: Sequelize.STRING(120)
        },
        line2: {
          allowNull: true,
          type: Sequelize.STRING(120)
        },
        city: {
          allowNull: true,
          type: Sequelize.STRING(60)
        },
        state: {
          allowNull: true,
          type: Sequelize.STRING(2)
        },
        country: {
          allowNull: true,
          type: Sequelize.STRING(60)
        },
        zipCode: {
          allowNull: true,
          type: Sequelize.STRING(8)
        },
      }, { trx });

      await trx.commit();
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Locations');
  }
};
