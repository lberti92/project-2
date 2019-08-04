module.exports = function (sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    distId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  Favorite.associate = function (models) {
    Favorite.belongsTo(models.Distillery, {foreignKey: 'distId'});
    Favorite.belongsTo(models.User, {foreignKey: 'userId'});
  };

  return Favorite;
};
