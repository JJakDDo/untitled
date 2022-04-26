const express = require("express");
const cors = require("cors");

const connectDB = require("./db/connect");

const characterRouter = require("./routes/character");
const monsterRouter = require("./routes/monster");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/untitled";
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/character", characterRouter);
app.use("/monster", monsterRouter);

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
