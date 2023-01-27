const Activity = require("../models/Activity");
const User = require("../models/User");
const Likes = require("../models/Likes");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Comments = require("../models/Comments");

exports.comments = async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	const userId = decodedToken.userId;

	const commentsData = {
		activityId: req.body.activityId,
		userId: userId,
		content: req.body.content
	};
	const comments = new Comments(commentsData);
	await Activity.findOne({ where: { id: req.body.activityId } }).then(() =>
		comments
			.save()
			.then(() => res.send({ comments: comments }))
			.catch((err) => console.log(err))
	);
};

exports.getComments = async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	const userId = decodedToken.userId;

	const activityId = req.query.id;
	await Comments.findAll({ where: { activityId: activityId }, include: [{ model: User }] })
		.then((data) => res.status(200).json(data))
		.catch((err) => console.log(err));
};

exports.deleteComments = async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	const userId = decodedToken.userId;

	const activityId = req.body.activityId;
	const commentId = req.body.commentId;

	const comment = await Comments.findOne({ where: { activityId: activityId, id: commentId } });

	comment.destroy().then((data) => {
		res.send(data);
		// Comments.findAll({ where: { activityId: activityId } })
		// 	.then((data) => res.status(200).json(data))
		// 	.catch((err) => console.log(err));
	});
};

exports.modifyComments = async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	const userId = decodedToken.userId;

	console.log(req.body.data);
	const commentId = req.body.data.commentId;
	const activityId = req.body.data.activityId;
	const content = req.body.data.content;

	const values = { content: content };
	const selector = { where: { activityId: activityId, id: commentId } };

	const result = await Comments.findOne(selector);

	result
		.update(values)
		.then((data) => res.send(data))
		.catch((err) => console.log(err));
};
