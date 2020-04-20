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

router.patch("/me", auth, async (req, res) => {
	try {
		const value = req.body.recieveEmails;
		req.user.recieveEmails = value;
		const message = value ? "Вы подключили уведомления 📩" : "Вы отменили рассылку";
		await req.user.save();

		res.json({ user: req.user, message });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

module.exports = router;
