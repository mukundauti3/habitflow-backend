require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS (important for frontend connection)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/habits", require("./routes/habitRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));
app.use("/notes", require("./routes/notesRoutes"));
app.use("/sleep", require("./routes/sleepRoutes"));
app.use("/journal", require("./routes/journalRoutes"));
app.use("/workout", require("./routes/workoutRoutes"));

// ✅ FIXED PORT (important for AWS)
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});