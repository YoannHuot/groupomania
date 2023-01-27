const { Sequelize } = require("sequelize");

module.exports = new Sequelize("projet_7_groupomania", "root", "password", {
	host: "localhost",
	dialect: "mysql"
});
