const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  const [data] = await db.query(
    "SELECT * FROM daily_notes WHERE user_id=?",
    [req.user.id]
  );
  res.json(data);
});

router.post("/", auth, async (req, res) => {
  const { date, content } = req.body;

  await db.query(
    "REPLACE INTO daily_notes (user_id, date, content) VALUES (?,?,?)",
    [req.user.id, date, content]
  );

  res.json({ msg: "Saved" });
});

module.exports = router;