const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const emailvalidator = require("email-validator");
const passwordValidator = require("password-validator");
const schema = new passwordValidator(); //initialisation d'un nouveau password validator
schema
	.is()
	.min(8, "minimum 8 chars ") // Minimum length 8
	.is()
	.max(12, "Maximum 8 chars ") // Maximum length 12
	.has()
	.uppercase() // Must have uppercase letters
	.has();
// .lowercase() // Must have lowercase letters
// .has()
// .digits(2) // Must have at least 2 digits
// .has()
// .not()
// .spaces(); // Should not have spaces

exports.signup = (req, res, next) => {
	if (!emailvalidator.validate(req.body.email)) {
		res.status(400).json("Email non valide");
		return;
	}
	if (!schema.validate(req.body.password)) {
		res.status(400).json(
			"Password non valide, Minimum length 8 & Maximum length 12 and Must have uppercase letters"
		);
		return;
	}
	bcrypt
		.hash(req.body.password, 10)
		.then(hash => {
			const user = new User({
				email: req.body.email,
				password: hash,
				role: "user"
			});
			user.save()
				.then(() =>
					res.status(201).json({
						userId: user._id,
						role: user.role,
						token: jwt.sign({ userId: user._id }, process.env.RANDOM_TOKEN_SECRET, {
							expiresIn: "24h"
						})
					})
				)
				.catch(error =>
					res
						.status(400)
						.json("Utilisateur non créé ! email existe deja, réessayer svp...")
				);
		})
		.catch(error => res.status(400).json("Utilisateur non créé ! réessayer svp..."));
};
exports.login = (req, res, next) => {
	if (!emailvalidator.validate(req.body.email)) {
		res.status(400).json("Email non valide");
		return;
	}
	if (!schema.validate(req.body.password)) {
		res.status(400).json(schema.validate(req.body.password, { details: true }));
		return;
	}
	User.findOne({ email: req.body.email })
		.then(user => {
			if (!user) {
				return res.status(401).json("Utilisateur non trouvé !");
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then(valid => {
					if (!valid) {
						return res.status(401).json("Mot de passe incorrect !");
					}
					res.status(200).json({
						userId: user._id,
						role: user.role,
						token: jwt.sign({ userId: user._id }, process.env.RANDOM_TOKEN_SECRET, {
							expiresIn: "24h"
						})
					});
				})
				.catch(error => res.status(500).json("Erreur de connexion, veuiller réessayer"));
		})
		.catch(error => res.status(500).json("Erreur de connexion, veuiller réessayer"));
};
