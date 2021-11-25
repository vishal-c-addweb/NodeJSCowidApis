import connectDB from "../config/dbconnection";
import express from "express";
import user from "./routes/user";
import addmember from "./routes/addmember";
import schedule from "./routes/schedule";
import vaccinated from "./routes/vaccinated";
import vaccinecenter from "./routes/vaccinecenter";
const bodyParser = require("body-parser");

const app = express();

//connect to db
connectDB();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use('/cowid-19', user);
app.use('/cowid-19', addmember);
app.use('/cowid-19', schedule);
app.use('/cowid-19', vaccinated);
app.use('/cowid-19', vaccinecenter);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;