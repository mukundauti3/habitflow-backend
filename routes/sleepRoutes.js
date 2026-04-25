const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  const [data] = await db.query(
    "SELECT * FROM sleep_logs WHERE user_id=?",
    [req.user.id]
  );
  res.json(data);
});

router.post("/", auth, async (req, res) => {
  const { date, hours } = req.body;

  await db.query(
    "INSERT INTO sleep_logs (user_id, date, hours) VALUES (?,?,?)",
    [req.user.id, date, hours]
  );

  res.json({ msg: "Logged" });
});

module.exports = router;