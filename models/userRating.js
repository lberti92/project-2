module.exports = function (sequelize, DataTypes) {
    const UserRating = sequelize.define("UserRating", {
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: 5
            }
        }
        ,
        comment: {
            type: DataTypes.TEXT,
            required: false
        }
    });

    UserRating.associate = function (models) {
        UserRating.belongsTo(models.Alcohol, {
            foreignKey: {
              allowNull: false
            }
          });
    };

    return UserRating;
};