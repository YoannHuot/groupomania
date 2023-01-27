const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Activity = require("../models/Activity");

exports.signup = async (req, res) => {
	const dataUser = {
		email: req.body.payload.mail,
		firstName: req.body.payload.firstname,
		lastName: req.body.payload.lastname,
		age: req.body.payload.age,
		password: req.body.payload.password,
		confirmPassword: req.body.payload.confirmPassword,
		isadmin: "",
		inscription: req.body.payload.inscription,
		imageUrl: req.body.payload.imageUrl,
		birthday: req.body.payload.birthday
	};

	let {
		email,
		firstName,
		lastName,
		age,
		password,
		confirmPassword,
		inscription,
		imageUrl,
		birthday
	} = dataUser;

	const checkMail = await User.findOne({ where: { email: email } });
	if (checkMail !== null) {
		console.log("Mail déjà enregistrée, id :" + checkMail.id);
		return res.status(401).json({ error: "Cette adresse mail a déja été enregistrée" });
	} else if (password !== confirmPassword) {
		console.log("les mots de passe ne correspondent pas ");
		return res.status(401).json({ error: "les mots de passe ne correspondent pas" });
	} else {
		bcrypt.hash(password, 10).then((hash) => {
			const user = new User({
				email: email,
				firstName: firstName,
				lastName: lastName,
				age: age,
				password: hash,
				isadmin: false,
				inscription: inscription,
				imageUrl: imageUrl,
				birthday: birthday
			});
			if (email === "admin@groupomania.fr") {
				user.isadmin = true;
			} else {
				user.isadmin = false;
			}
			user.save()
				.then(() =>
					res.status(201).json({
						message: "Utilisateur créé !",
						userId: user.id,
						token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
							expiresIn: "24h"
						})
					})
				)
				.catch((error) => console.log(error));
		});
	}
};

exports.login = async (req, res) => {
	console.log(req.body.lastName);
	const dataUser = {
		email: req.body.mail,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password
	};
	let { email, lastName, firstName, password } = dataUser;
	console.log(dataUser);

	const user = await User.findOne({ where: { email: email } });
	if (user === null) {
		console.log("Mail déjà enregistrée, id :" + user.id);
		return res.status(401).json({ error: "Cette adresse mail n'existe pas" });
	} else if (user.lastName !== lastName) {
		console.log(user.lastName);
		console.log(lastName);
		console.log("Nom de l'utilisateur invalide ");
		return res.status(401).json({ error: "Nom de l'utilisateur invalide" });
	} else if (user.firstName !== firstName) {
		console.log("Prénom de l'utilisateur invalide ");
		return res.status(401).json({ error: "Prénom de l'utilisateur invalide" });
	} else {
		await bcrypt
			.compare(password, user.password)
			.then((valid) => {
				if (!valid) {
					console.log("mot de passe invalide");
					return res.status(401).json({ error: "Mot de passe incorrect !" });
				}
				res.status(200).json({
					userId: user.id,
					token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
						expiresIn: "24h"
					})
				});
			})
			.catch((error) => res.status(500).json({ error }));
	}
};

exports.profil = async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	userId = decodedToken.userId;
	await User.findOne({ where: { id: userId } })
		.then((data) => res.status(200).json(data))
		.catch((err) => res.status(404).json({ err }));
};

exports.modifyProfil = async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	userId = decodedToken.userId;

	const calculateDate = () => {
		var diff = Math.abs(new Date() - new Date(req.body.birthday));
		let diffMilli = diff / 60000 / 60 / 24 / 365.25;
		return Math.floor(diffMilli);
	};

	let ageUser = calculateDate();

	const dataUser = {
		email: req.body.email,
		age: ageUser,
		birthday: req.body.birthday,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		job: req.body.job,
		bio: req.body.bio
	};
	let { email, username, birthday, age, password, confirmPassword, job, bio } = dataUser;

	const user = await User.findOne({ where: { id: userId } });

	if (user !== null && user.email !== email) {
		console.log("Mail déjà enregistrée, id :" + user.id);
		return res.status(401).json({ error: "Cette adresse mail a déja été enregistrée" });
	} else if (age === 0) {
		console.log("age invalide");
		return res.status(401).json({ error: "veuillez rentrer un age valide" });
	} else if (email === "admin@groupomania.fr") {
		return res
			.status(401)
			.json({ error: "Vous ne pouvez pas changer le mail de l'administrateur" });
	} else {
		await bcrypt
			.hash(password, 10)
			.then((hash) => {
				password = hash;

				var values = { email, username, birthday, age, password, job, bio };
				var selector = { where: { id: userId } };

				const user = User.update(values, selector)
					.then((data) => res.status(200).json(data))
					.catch((err) => res.status(404).json({ err }));
			})
			.catch((err) => {
				res.status(500).json({ error: err.message });
			});
	}
};

exports.modifyProfilPicture = async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
	const userId = decodedToken.userId;

	if (req.files === null) {
		return res.status(404).json({ error: "Aucun fichier téléchargé" });
	} else {
		const dataUser = {
			file: req.files.file,
			imageUrl: `${req.protocol}://${req.get("host")}/images/${req.files.file.name}`
		};

		let { imageUrl, file } = dataUser;
		let images = process.cwd();

		file.mv(`${images}/images/${file.name}`, (err) => {
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});

		await User.findOne({ where: { id: userId } }).then((user) => {
			let findPicture = user.imageUrl;
			let values = { imageUrl };
			let selector = { where: { id: userId } };

			const updatePicture = () => {
				User.update(values, selector)
					.then(() => {
						res.send({
							fileName: imageUrl
						});
					})
					.catch((err) => res.status(404).json({ error: err.message }));
			};

			pictureName = findPicture.split("/images/")[1];

			Activity.findAll({ where: { userId: userId } }).then((data) => {
				Activity.update(values, { where: { userId: userId } }).then(
					console.log("Photo de profil update")
				);
			});

			if (findPicture) {
				fs.unlink(`${images}/images/${pictureName}`, () => {
					updatePicture();
				});
			} else {
				updatePicture();
			}
		});
	}
};

exports.showOtherUserProfil = async (req, res) => {
	const userId = req.params.id;
	await User.findOne({ where: { id: userId } }).then((data) => res.send(data));
};
