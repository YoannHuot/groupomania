const Sequelize = require("sequelize");
const db = require("../config/database");
const Activity = require("./Activity");
const User = require("./User");
const Likes = require("./Likes");
const Comments = require("./Comments");

User.hasMany(Activity, { as: "user", onDelete: "CASCADE" });
Activity.belongsTo(User, { as: "activity", onDelete: "CASCADE" });
User.belongsToMany(Activity, {
	foreignKey: "user_id",
	through: Likes,
	onDelete: "CASCADE"
});
Activity.belongsToMany(User, {
	foreignKey: "activity_id",
	through: Likes,
	onDelete: "CASCADE"
});
// User.belongsToMany(Activity, { foreignKey: "user_id", through: Comments, onDelete: "CASCADE" });
// Activity.belongsToMany(User, { foreignKey: "activity_id", through: Comments, onDelete: "CASCADE" });
Comments.belongsTo(User);
Comments.belongsTo(Activity);

db.sync()
	.then(() => console.log("Toutes les bases de données ont été créées"))
	.catch((err) => console.log(err));

// db.sync({ force: true }).then(() => console.log("Remise des BDD à 0"));
