'use strict';
const models = require('../models')

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      
      const fs = require('fs')
      const json = JSON.parse(fs.readFileSync("new_questions.json", 'utf8'))
      return models.Question.bulkCreate(json)
      
      
      
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
      
    */
      return models.Question.sync({force: true})
  }
};
