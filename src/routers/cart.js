const { Router } = require("express");
const Laptop = require("../models/laptop");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = Router();

// /api/cart
router.get("/", auth, async (req, res) => {
	try {
		const { cart } = await User.findById(req.user._id).populate("cart");
		res.json(cart);
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
});

// /api/cart/add
router.post("/add", auth, async (req, res) => {
	try {
		const laptop = await Laptop.findById(req.body.id);
		const exist = req.user.cart.find((item) => item.equals(laptop._id));

		if (exist) {
			return res.status(400).json({ message: "Вы уже добавляли этот товар в корзину!" });
		}
		req.user.cart.push(laptop);
		await req.user.save();

		res.status(201).json({ message: "Товар добавлен в Вашу корзину!", laptop });
	} catch (e) {
		res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

module.exports = router;
