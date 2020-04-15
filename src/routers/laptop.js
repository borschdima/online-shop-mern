const { Router } = require("express");
const Laptop = require("../models/laptop");
const auth = require("../middleware/auth");
const router = Router();

// /api/laptops
// /api/laptops?skip=12
// /api/laptops?sortBy=createdAt:desc
// /api/laptops?sortBy=price:desc
// /api/laptops?brand=ASUS,APPLE
// /api/laptops?price=5000,30000
router.get("/", auth, async (req, res) => {
	const match = {};
	const sort = {};
	const skip = parseInt(req.query.skip);

	if (req.query.sortBy) {
		const parts = req.query.sortBy.split(":");
		sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
	}

	if (req.query.brand) {
		const values = req.query.brand.split(",");
		match.brand = values;
	}

	if (req.query.price) {
		const values = req.query.price.split(",");
		const lowerPrice = parseInt(values[0]);
		const upperPrice = parseInt(values[1]);
		match.price = { $gte: lowerPrice, $lte: upperPrice };
	}

	try {
		const laptops = await Laptop.find(match, null, { limit: 12, skip, sort });
		const allLaptopsCount = await Laptop.find(match).countDocuments();

		res.json({ laptops, allLaptopsCount });
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

// /api/laptops/:id
router.get("/:id", auth, async (req, res) => {
	try {
		const laptop = await Laptop.findById(req.params.id);
		if (!laptop) {
			return res.status(404).json({ message: "Произошла ошибка ❌ Попробуйте позже" });
		}
		res.json(laptop);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

// /api/laptops/add
router.post("/add", auth, async (req, res) => {
	try {
		const newLaptop = new Laptop(req.body);
		await newLaptop.save();

		res.status(201).json({ message: "Товар добавлен в базу ✅", newLaptop });
	} catch (e) {
		res.status(500).json({ message: "Что-то пошло не так, попробуйте снова 🚫" });
	}
});

module.exports = router;
