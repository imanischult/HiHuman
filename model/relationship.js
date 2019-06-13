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

    // Relationship.associate = function (models) {
    //     // We're saying that a Relationship belongs to a User
    //     // A Post can't be created without an Author due to the foreign key constraint
    //     Post.belongsTo(models.Author, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    //};

    return Relationship;
};
