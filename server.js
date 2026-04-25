require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/habits", require("./routes/habitRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));
app.use("/notes", require("./routes/notesRoutes"));
app.use("/sleep", require("./routes/sleepRoutes"));
app.use("/journal", require("./routes/journalRoutes"));
app.use("/workout", require("./routes/workoutRoutes"));

app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);