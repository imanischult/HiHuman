module.exports = function (sequelize, DataTypes) {
    var Activity = sequelize.define("Activity", {
        owner: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            
        },
        location: {
            type: DataTypes.STRING,
            
        },
        date: {
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.STRING,
            
        },
        invitees: {
            type: DataTypes.STRING,
        }

    });

    Activity.associate = function (models) {
        Activity.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Activity;
};