const Activity = require("../models/Activity");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Comments = require("../models/Comments");
const Likes = require("../models/Likes");

exports.addActivity = async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	const userId = decodedToken.userId;
	console.log("ici");
	console.log(userId);

	const dataActivity = {
		title: req.body.title,
		content: req.body.content,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		userId: userId,
		imageUrl: req.body.imageUrl,
		created_at: Date.now()
	};

	let { imageUrl, title, content, firstName, lastName, created_at } = dataActivity;
	const checkActicityUserId = Activity.findOne({ where: { userId: userId } });

	if (checkActicityUserId !== null || checkActicityUserId == null) {
		const activity = new Activity({
			userId: userId,
			title: title,
			content: content,
			imageUrl: imageUrl,
			created_at: created_at,
			lastName: lastName,
			firstName: firstName
		});
		activity
			.save()
			.then(() =>
				res.status(201).json({
					message: "Activité créée!",
					activity
				})
			)
			.catch((error) => console.log(error));
	}
};

exports.uploadPicture = async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	const userId = decodedToken.userId;
	const activityId = req.headers && req.headers.activityid;

	if (req.files === null || !activityId) {
		return res.status(404).json({ error: "Aucun fichier téléchargé" });
	} else {
		const uploadedPicture = {
			picture: req.files.image,
			pictureUrl: `${req.protocol}://${req.get("host")}/images/${req.files.image.name}`
		};
		let { picture, pictureUrl } = uploadedPicture;
		let images = process.cwd();

		picture.mv(`${images}/images/${picture.name}`, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});

		await Activity.max("id").then((activity) => {
			Activity.findOne({ where: { id: activity } }).then((data) => updatePicture(data));

			const updatePicture = (i) => {
				let selector = { where: { file: i.dataValues.file } };
				let updateValues = { file: pictureUrl };
				i.update(updateValues, selector)
					.then(() => {
						res.send({ file: pictureUrl, id: i.dataValues.id });
					})
					.catch((err) => res.status(404).json({ error: err.message }));
			};
		});
	}
};

exports.getActivity = async (req, res) => {
	await Activity.findAll()
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(404).json({ err }));
};

exports.modifyActivity = async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	const userId = decodedToken.userId;
	const activityId = req.headers && req.headers.activityid;

	const activity = await Activity.findOne({ where: { id: req.body.id } });
	activity.update({ content: req.body.content, title: req.body.title }).then(() =>
		Activity.findAll()
			.then((data) => res.status(200).json(data))
			.catch((err) => res.status(404).json({ err }))
	);
};

exports.modifyPictureActivity = async (req, res) => {
	console.log("modify Picture Activity");
	console.log(req);
};

exports.deleteActivity = async (req, res) => {
	const activityId = req.body.activityId;

	await Comments.destroy({ where: { activityId: activityId } });

	const activityDelete = await Activity.findOne({ where: { id: activityId } });
	activityDelete.destroy().then(() => {
		Activity.findAll()
			.then((data) => res.status(200).json(data))
			.catch((err) => res.status(404).json({ err }));
	});
};

exports.getActivityByUser = async (req, res) => {
	const userId = req.params.id;
	const likes = await Likes.findAll({ where: { user_id: userId } });
	const comments = await Comments.findAll({ where: { userId: userId } });
	await Activity.findAll({ where: { userId: userId } })
		.then((data) =>
			res.send({ message: data.length, likes: likes.length, comments: comments.length })
		)
		.catch((err) => console.log(err));
};

exports.getAllActivityByUser = async (req, res) => {
	const userId = req.params.id;

	Activity.findAll({ where: { userId: userId } })
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
};
