module.exports = function (sequelize, DataTypes) {
    var Distillery = sequelize.define("Distillery", {

        distillery: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: false
    });

    Distillery.associate = function (models) {
        Distillery.hasMany(models.Alcohol, {
            onDelete: "CASCADE"
        });        
        Distillery.belongsToMany(models.User, {through: 'ToTry', foreignKey: 'userId', as: "userSaved", include: [models.Alcohol]});
        Distillery.belongsToMany(models.User, {through: 'Favorites', foreignKey: 'distId', as: "user", include: [models.Alcohol]});
    }
    return Distillery;
};