module.exports = function (sequelize, DataTypes) {
    var Relationship = sequelize.define("Relationship", {
        relationshipType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        relatingUserId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        relatedUserId: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    Relationship.associate = function (models) {
        // We're saying that a Relationship belongs to a User here. 
        Relationship.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Relationship;
};
