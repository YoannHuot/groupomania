const Sequelize = require("sequelize");
const { models } = require("../config/database");
const db = require("../config/database");

const Likes = db.define(
	"likes",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		}
	},
	{ timestamps: false }
);

module.exports = Likes;
