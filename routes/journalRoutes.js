const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  const [data] = await db.query(
    "SELECT * FROM journal_entries WHERE user_id=? ORDER BY date DESC",
    [req.user.id]
  );
  res.json(data);
});

router.post("/", auth, async (req, res) => {
  const { date, content, mood } = req.body;

  await db.query(
    "INSERT INTO journal_entries (user_id, date, content, mood) VALUES (?,?,?,?)",
    [req.user.id, date, content, mood]
  );

  res.json({ msg: "Saved" });
});

module.exports = router;