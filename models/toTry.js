module.exports = function (sequelize, DataTypes) {
  var ToTry = sequelize.define("ToTry", {
    UserId: DataTypes.INTEGER,
    DistilleryId: DataTypes.INTEGER
  });

  ToTry.associate = function (models) {
    ToTry.belongsTo(models.User, { foreignKey: 'UserId' });
    ToTry.belongsTo(models.Distillery, { foreignKey: 'DistilleryId' });
  };

  return ToTry;
};
