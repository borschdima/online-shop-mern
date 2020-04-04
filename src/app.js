const express = require("express");
const path = require("path");
const config = require("config");
const authRouter = require("./routers/auth");
const laptopRouter = require("./routers/laptop");
require("./db/mongoose");

const PORT = config.get("port") || 5000;

const app = express();

// Middleware
app.use(express.json({ extended: true }));

// Routers
app.use("/api/auth", authRouter);
app.use("/api/laptops", laptopRouter);

// Production mode
if (process.env.NODE_ENV === "production") {
	app.use("/", express.static(path.join(__dirname, "client", "build")));

	app.get("*", (req, res) => {
		res.sendfile(path.resolve((__dirname, "client", "build", "index.html")));
	});
}

app.listen(PORT, () => console.log("Server is running on port " + PORT));
