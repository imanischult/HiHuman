module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        authId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        displayName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profilePicture: {
            type: DataTypes.STRING,
        }

    });

    User.associate = function (models) {
        // This will actually be User to Relationships``
        // A Post can't be created without an Author due to the foreign key constraint
        User.hasMany(models.Relationship, {
            // foreignKey: {
            //     allowNull: false
            // }
        });
    };

    return User;
};
