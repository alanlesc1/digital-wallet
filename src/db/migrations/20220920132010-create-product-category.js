'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('m_productcategory', {
        m_productcategory_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        m_productcategory_uu: {
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
        value: {
          allowNull: true,
          type: Sequelize.STRING(60)
        },
        name: {
          allowNull: true,
          type: Sequelize.STRING(255)
        },
        parent_productcategory_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'm_productcategory'
            },
            key: 'm_productcategory_id'
          },
          allowNull: true
        },
      }, { trx });

      await trx.commit();
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('m_productcategory');
  }
};
