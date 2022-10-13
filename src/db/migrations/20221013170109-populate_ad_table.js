'use strict';
const { v4: uuidv4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ad_table', [
      {
        ad_table_uu: uuidv4(),
        created: new Date(),
        updated: new Date(),
        tablename: 'ad_table'
      },
      {
        ad_table_uu: uuidv4(),
        created: new Date(),
        updated: new Date(),
        tablename: 'c_user'
      },
      {
        ad_table_uu: uuidv4(),
        created: new Date(),
        updated: new Date(),
        tablename: 'c_userqrcode'
      },
      {
        ad_table_uu: uuidv4(),
        created: new Date(),
        updated: new Date(),
        tablename: 'c_userrole'
      },
      {
        ad_table_uu: uuidv4(),
        created: new Date(),
        updated: new Date(),
        tablename: 'c_userfcmtoken'
      },
      {
        ad_table_uu: uuidv4(),
        created: new Date(),
        updated: new Date(),
        tablename: 'c_location'
      },
      {
        ad_table_uu: uuidv4(),
        created: new Date(),
        updated: new Date(),
        tablename: 'c_userwallet'
      },
      {
        ad_table_uu: uuidv4(),
        created: new Date(),
        updated: new Date(),
        tablename: 'm_productcategory'
      },
      {
        ad_table_uu: uuidv4(),
        created: new Date(),
        updated: new Date(),
        tablename: 'm_product'
      },
      {
        ad_table_uu: uuidv4(),
        created: new Date(),
        updated: new Date(),
        tablename: 'c_order'
      },
      {
        ad_table_uu: uuidv4(),
        created: new Date(),
        updated: new Date(),
        tablename: 'c_orderline'
      },
      {
        ad_table_uu: uuidv4(),
        created: new Date(),
        updated: new Date(),
        tablename: 'c_payment'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ad_table', null, {});
  }
};
