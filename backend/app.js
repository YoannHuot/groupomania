const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const index = require("./models/index");

const userRoutes = require("./routes/user");
const activityRoutes = require("./routes/activity");
const likesRoutes = require("./routes/likes");
const commentsRoutes = require("./routes/comments");
// Express

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// db veut dire database

app.use(
	cors({
		origin: "*",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 204,
		credentials: true,
		allowedHeaders: "*"
	})
);
app.use(fileUpload());
app.use("/images", express.static(path.join(__dirname, "images")));

// DATABASE
const db = require("./config/database");

// SERVER
const PORT = process.env.port || 5000;

// TEST DB
db.authenticate()
	.then(() => console.log("DataBase connected"))
	.catch((err) => {
		"Error" + err;
	});

// db.sequelize.sync();
app.use("/user", userRoutes);
app.use("/activity", activityRoutes);
app.use(likesRoutes);
app.use(commentsRoutes);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
