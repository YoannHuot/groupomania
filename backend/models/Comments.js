const Sequelize = require("sequelize");
const db = require("../config/database");

const Comments = db.define(
	"comments",
	{
		id: {
			type: Sequelize.DataTypes.BIGINT(20),
			primaryKey: true,
			autoIncrement: true
		},
		content: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},

	{ timestamps: false }
);

module.exports = Comments;
