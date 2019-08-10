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
            defaultValue: 0
        },
    }, {
        timestamps: false
    });

    Alcohol.associate = function (models) {
        Alcohol.belongsTo(models.Distillery, {
            foreignKey: {
                allowNull: false
            }
        })

        Alcohol.hasMany(models.UserRating, {
            onDelete: "cascade"
          })
    }
    return Alcohol;
};
