const Sequelize = require("sequelize");
const { models } = require("../config/database");
const db = require("../config/database");

const User = db.define(
	"user",
	{
		id: {
			type: Sequelize.DataTypes.BIGINT(20),
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		imageUrl: { type: Sequelize.STRING, allowNull: true },
		firstName: {
			type: Sequelize.STRING
		},
		lastName: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		age: {
			type: Sequelize.INTEGER,
			allowNull: true
		},
		job: {
			type: Sequelize.STRING
		},
		birthday: {
			type: Sequelize.DATE,
			allowNull: true
		},
		inscription: {
			type: Sequelize.DATE,
			allowNull: true
		},
		bio: {
			type: Sequelize.STRING,
			allowNull: true
		},
		isadmin: {
			type: Sequelize.BOOLEAN,
			allowNull: false
		}
	},

	{ timestamps: false }
);

module.exports = User;
