const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  const [data] = await db.query(
    "SELECT * FROM workout_logs WHERE user_id=?",
    [req.user.id]
  );
  res.json(data);
});

router.post("/", auth, async (req, res) => {
  const { date, category, name, weight, sets, reps, duration } = req.body;

  await db.query(
    "INSERT INTO workout_logs (user_id, date, category, name, weight, sets, reps, duration) VALUES (?,?,?,?,?,?,?,?)",
    [req.user.id, date, category, name, weight, sets, reps, duration]
  );

  res.json({ msg: "Workout added" });
});

module.exports = router;