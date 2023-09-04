const express = require("express");
const { connection } = require("./config/db");
const { userController } = require("./controllers/user.controller");
const { noteController } = require("./controllers/notes.controller");
const { authentication } = require("./middlewares/authentication");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json("BASE API ENDPOINT");
});
app.use("/user", userController);
app.use(authentication);
app.use("/notes", noteController);
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`connected to port ${process.env.PORT}`);
  } catch (error) {
    console.log("error while connecting to db");
    console.log(error);
  }
});
