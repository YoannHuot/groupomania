const Sequelize = require("sequelize");
const db = require("../config/database");

const Activity = db.define(
	"activity",
	{
		id: {
			type: Sequelize.DataTypes.BIGINT(20),
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: Sequelize.STRING,
			required: true
		},
		firstName: {
			type: Sequelize.STRING,
			required: true
		},
		lastName: {
			type: Sequelize.STRING,
			required: true
		},
		content: {
			type: Sequelize.STRING,
			required: true
		},
		created_at: {
			type: Sequelize.DATE,
			required: false
		},
		imageUrl: { type: Sequelize.STRING, allowNull: true },
		file: { type: Sequelize.STRING, allowNull: true },
		like: { type: Sequelize.STRING, allowNull: true, defaultValue: 0 }
	},

	{ timestamps: false }
);

module.exports = Activity;
