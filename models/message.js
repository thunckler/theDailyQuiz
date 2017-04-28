'use strict';
module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define('Message', {
    questionId: DataTypes.INTEGER,
    number: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Message.belongsTo(models.Question);
      }
    }
  });

  return Message;
};