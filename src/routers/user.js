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

router.patch("/me/mailing", auth, async (req, res) => {
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

router.patch("/me/info", auth, async (req, res) => {
	try {
		let { name, email } = req.body;
		name = name.trim().toLowerCase();
		email = email.trim().toLowerCase();

		// Checking if is there user with requseted email
		if (email !== req.user.email) {
			const candidat = await User.findOne({ email });

			if (candidat) {
				return res.status(400).json({ message: "Email занят" });
			}
		}

		// Checking if data is not the same
		if (req.user.name === name && req.user.email === email) {
			return res.status(400).json({ message: "Хотя бы одно поле должно поменяться 🚫" });
		}

		req.user.name = name;
		req.user.email = email;

		const message = "Информация обновлена ✅";
		await req.user.save();

		res.json({ user: req.user, message });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

module.exports = router;
