const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const userRoute = require("./routes/user.routes");
const missionRoute = require("./routes/misson.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//routes
app.use("/api/user", userRoute);
app.use("/api/mission", missionRoute);

//server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
