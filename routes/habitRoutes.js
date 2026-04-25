const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

// GET habits
router.get("/", auth, async (req, res) => {
  const [data] = await db.query(
    "SELECT * FROM habits WHERE user_id=?",
    [req.user.id]
  );
  res.json(data);
});

// ADD habit
router.post("/", auth, async (req, res) => {
  const { title } = req.body;

  await db.query(
    "INSERT INTO habits (user_id, title) VALUES (?,?)",
    [req.user.id, title]
  );

  res.json({ msg: "Habit added" });
});

// DELETE habit
router.delete("/:id", auth, async (req, res) => {
  await db.query("DELETE FROM habits WHERE id=?", [req.params.id]);
  res.json({ msg: "Deleted" });
});


// ⭐ ADD THIS NEW ROUTE HERE
router.post("/log", auth, async (req, res) => {
  const { habitId, date } = req.body;

  await db.query(
    "INSERT INTO habit_logs (habit_id, date, completed) VALUES (?, ?, 1)",
    [habitId, date]
  );

  res.json({ msg: "Logged" });
});

module.exports = router;