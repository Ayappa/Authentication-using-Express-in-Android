var jsonobj = require("./discount");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
	if (res) {
		res.json(jsonobj);
	} else {
		return res.status(400).json(err);
	}
});

module.exports = router;
