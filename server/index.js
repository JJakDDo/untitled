require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors");

const connectDB = require("./db/connect");

const characterRouter = require("./routes/character");
const monsterRouter = require("./routes/monster");
const userRouter = require("./routes/user");
const battleRouter = require("./routes/battle");
const craftRouter = require("./routes/craft");

const errorHandler = require("./middlewares/errorHandler");
const authentication = require("./middlewares/authentication");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/untitled";
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/character", authentication, characterRouter);
app.use("/monster", monsterRouter);
app.use("/user", userRouter);
app.use("/battle", battleRouter);
app.use("/craft", craftRouter);

app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(MONGODB_URI);
    console.log(`DB is connected to ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
