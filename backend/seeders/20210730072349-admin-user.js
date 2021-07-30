'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      email: 'YWRtaW5AZ21haWwuY29t',
      firstName: 'ADMINISTRATEUR',
      lastName: 'GROUPOMANIA',
      password : '$2b$10$wWaeNpPw.fwIOY58D8iPkebONp2K772pk6eoOuckv2UaKaf9nFPxC',
      imageUrl: 'http://localhost:3000/images/picture_default.jpg',
      isAdmin: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('Users', null, {});
  }
};
