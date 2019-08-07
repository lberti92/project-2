var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    //  Method to check if the password being used to log in matches the hashed password 
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    // Encrypting the password before it is added to the table
    User.beforeCreate(function(user) {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });

    User.associate = function(models) {
        // User has many distilleries
        User.belongsToMany(models.Distillery, {through: 'Favorites', foreignKey: 'userId', as: "favorites"});
        User.belongsToMany(models.Distillery, {through: "ToTries", foreignKey: "distToTryId", as: "toTry"});

      };

    return User;
};
