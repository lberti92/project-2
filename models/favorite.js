module.exports = function(sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {
      userId: DataTypes.INTEGER,
      favDistId: DataTypes.INTEGER
    });
  
    Favorite.associate = function(models) {
        Favorite.belongsTo(models.User, {foreignKey: 'userId'});
        Favorite.belongsTo(models.Distillery, {foreignKey: 'favId'});
    };
  
    return Favorite;
  };
  