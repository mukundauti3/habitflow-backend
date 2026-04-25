const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

// GET all tasks
router.get("/", auth, async (req, res) => {
  const [data] = await db.query(
    "SELECT * FROM daily_tasks WHERE user_id=? ORDER BY date DESC",
    [req.user.id]
  );
  res.json(data);
});

// ADD task
router.post("/", auth, async (req, res) => {
  const { text, date } = req.body;

  await db.query(
    "INSERT INTO daily_tasks (user_id, text, date) VALUES (?,?,?)",
    [req.user.id, text, date]
  );

  res.json({ msg: "Task added" });
});

// TOGGLE task
router.put("/:id", auth, async (req, res) => {
  await db.query(
    "UPDATE daily_tasks SET completed = !completed WHERE id=?",
    [req.params.id]
  );
  res.json({ msg: "Updated" });
});

// DELETE task
router.delete("/:id", auth, async (req, res) => {
  await db.query("DELETE FROM daily_tasks WHERE id=?", [req.params.id]);
  res.json({ msg: "Deleted" });
});


// ⭐ NEW FEATURE: CARRY FORWARD TASKS (yesterday incomplete)
router.get("/carry", auth, async (req, res) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const date = yesterday.toISOString().split("T")[0];

  const [data] = await db.query(
    "SELECT * FROM daily_tasks WHERE user_id=? AND date=? AND completed=0",
    [req.user.id, date]
  );

  res.json(data);
});

module.exports = router;