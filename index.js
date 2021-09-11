const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const studentRoute = require("./routes/student");
const authStudentRoute = require("./routes/auth.student");
const subjectRoute = require("./routes/subject");
const priceRoute = require("./routes/priceBox");
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("mongodb connected");
});
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to timGiaSu homepage");
});
app.use("/api/user", userRoute);
app.use("/api/student", studentRoute);
app.use("/api/auth", authRoute);
app.use("/api/studentAuth", authStudentRoute);
app.use("/api/subject", subjectRoute);
app.use("/api/price", priceRoute);

app.listen(8800, () => {
  console.log("Backend server is ready, tina");
});
