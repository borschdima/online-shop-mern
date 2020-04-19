const { Router } = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = Router();

// /api/user/me
router.get("/me", auth, async (req, res) => {
	try {
		res.json(req.user);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

module.exports = router;
