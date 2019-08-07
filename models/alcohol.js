module.exports = function (sequelize, DataTypes) {
    var Alcohol = sequelize.define("Alcohol", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alcoholType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        flavor: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    Alcohol.associate = function (models) {
        Alcohol.belongsTo(models.Distillery, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Alcohol;
};
