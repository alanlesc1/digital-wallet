'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('c_location', {
        c_location_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        c_location_uu: {
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
        zipcode: {
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
    await queryInterface.dropTable('c_location');
  }
};
