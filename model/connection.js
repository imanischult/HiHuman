var sequelize = require("../config/connection");

const Model = Sequelize.Model;
class User extends Model { }
User.init({
    groupType: {
        type: Sequelize.STRING,
        allowNull: false
    },
    members: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Owner: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
})