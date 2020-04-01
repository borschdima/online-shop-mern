const express = require("express");
const path = require("path");
const config = require("config");

const PORT = config.get("port") || 3000;

const app = express();
app.use(express.json({ extended: true }));

if (process.env.NODE_ENV === "production") {
	app.use("/", express.static(path.join(__dirname, "client", "build")));

	app.get("*", (req, res) => {
		res.sendfile(path.resolve((__dirname, "client", "build", "index.html")));
	});
}

app.listen(PORT, () => console.log("Server is running on port " + PORT));
