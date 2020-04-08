const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Laptop = require("./laptop");

const schema = Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			trim: true,
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
		cart: [
			{
				type: Schema.Types.ObjectId,
				ref: "Laptop",
			},
		],
	},
	{
		timestamps: true,
	}
);

schema.methods.toJSON = function () {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;

	return userObject;
};

schema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET || config.get("jwtSecret"), { expiresIn: "1d" });

	user.tokens = user.tokens.concat({ token });
	await user.save();

	const { payload } = jwt.decode(token, { complete: true });

	return { token, expiresIn: payload.exp };
};

schema.statics.findByCredentials = async (email, password) => {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error("Ошибка входа в систему 🚫");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Ошибка входа в систему 🚫");
	}

	return user;
};

// Hash the plain text password before saving
schema.pre("save", async function (next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

const User = model("User", schema);

module.exports = User;
