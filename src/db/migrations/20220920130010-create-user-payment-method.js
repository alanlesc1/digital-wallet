'use strict';

const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const trx = await queryInterface.sequelize.transaction();

    try {
      const schema = {
        c_userpaymentmethod_id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        c_userpaymentmethod_uu: {
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
          allowNull: true,
          type: Sequelize.STRING(6)
        },
        cardlastdigits: {
          allowNull: true,
          type: Sequelize.STRING(4)
        },
        cardbrand: {
          allowNull: true,
          type: Sequelize.STRING(60)
        },
        cardholdername: {
          allowNull: false,
          type: Sequelize.STRING(120)
        },
        cardexpmonth: {
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER
        },
        cardexpyear: {
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER
        },
        cardholderdocumenttype: {
          type: Sequelize.STRING(4),
          allowNull: false,
        },
        cardholderdocumentno: {
          type: Sequelize.STRING(14),
          allowNull: false,
        },
        billing_location_id: {
          type: Sequelize.DataTypes.INTEGER,
          references: {
            model: {
              tableName: 'c_location'
            },
            key: 'c_location_id'
          },
          allowNull: false
        },
        pgm_cardid: {
          allowNull: true,
          type: Sequelize.STRING(60)
        },
      };
      
      await queryInterface.createTable('c_userpaymentmethod', schema, { trx });

      await queryInterface.bulkInsert('ad_table', [
        {
          ad_table_uu: uuidv4(),
          created: new Date(),
          updated: new Date(),
          tablename: 'c_userpaymentmethod'
        },
      ], { trx });

      await queryInterface.addIndex(
        'c_userpaymentmethod',
        ['isactive', 'c_user_id'],
        {
          name: 'c_userpaymentmethod_activemethods',
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
    await queryInterface.dropTable('c_userpaymentmethod');
  }
};
