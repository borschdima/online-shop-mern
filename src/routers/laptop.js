const { Router } = require("express");
const Laptop = require("../models/laptop");
const auth = require("../middleware/auth");
const router = Router();

// /api/laptops/
router.get("/", auth, async (req, res) => {
	try {
		const laptops = await Laptop.find();
		if (!laptops) {
			return res.status(404).json({ message: "Ноутбуков нет в наличии" });
		}
		res.json(laptops);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

// /api/laptops/add
router.post("/add", auth, async (req, res) => {
	try {
		const newLaptop = new Laptop(req.body);
		await newLaptop.save();

		res.status(201).json({ message: "Товар добавлен в базу" });
	} catch (e) {
		res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

module.exports = router;
