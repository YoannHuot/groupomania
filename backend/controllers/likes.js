const Activity = require("../models/Activity");
const Likes = require("../models/Likes");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.likes = async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	const userId = decodedToken.userId;

	const likeFound = await Likes.findOne({
		where: {
			user_id: userId,
			activity_id: req.body.id
		}
	});

	if (!likeFound) {
		console.log("rien dans la BDD");
		const likes = new Likes({
			user_id: userId,
			activity_id: req.body.id
		});
		console.log(req.body);
		likes.save().then(() => {
			Activity.increment("like", { where: { id: req.body.id } })
				.then(() => res.send({ message: "like enregistré" }))
				.catch((err) => console.log(err));
		});
	} else {
		Likes.destroy({
			where: {
				user_id: userId,
				activity_id: req.body.id
			}
		})
			.then(() => Activity.decrement("like", { where: { id: req.body.id } }))
			.then(() => res.send({ message: "vous avez retiré votre like" }))
			.catch((err) => console.log(err));
		return console.log("like retiré");
	}
};
