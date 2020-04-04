const mongoose = require("mongoose");
const config = require("config");

mongoose.connect(config.get("mongoUrl"), {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
});
