module.exports = function (sequelize, DataTypes) {
  var ToTry = sequelize.define("ToTry", {
    userId: DataTypes.INTEGER,
    distToTryId: DataTypes.INTEGER
  });

  // ToTry.associate = function (models) {
  //   ToTry.belongsTo(models.User, { foreignKey: 'userId' })
  //   ToTry.belongsTo(models.Distillery, { foreignKey: 'distToTryId' })
  // };

  return ToTry;
};