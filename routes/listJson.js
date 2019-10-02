var jsonobj = require("./discount");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Item = require("../models/ItemAdd");
router.post("/", auth, (req, res) => {
	if (res) {
		Item.find({userId: req.user.id},(err,iteams)=>{
			if(iteams){
			return res.json(iteams);
			}else
			return res.json(err);

		})
	} else {
		return res.status(400).json(err);
	}
});

router.get("/", auth, (req, res) => {
	if (res) {
		res.json(jsonobj);
	} else {
		return res.status(400).json(err);
	}
});

router.put("/", auth, (req, res) => {
	if (req) {
		//res.json(jsonobj);
		const { image, name, price } = req.body;
		Item.findOne({ userId: req.user.id, name }, (error, items) => {
			if (items) {
				var count = items.count + 1;
				Item.findOneAndUpdate(
					{ userId: req.user.id, name },
					{ $set: { userId: req.user.id, image, name, price, count: count } },
					(err, itemList) => {
						if (itemList) {
							return res.json("added one item");
						} else {
							return res.send(err);
						}
					}
				);
				//return res.json({ count });
			} else {
				item = new Item({
					userId: req.user.id,
					image,
					name,
					price,
					count: 1
				});
				item.save(err => {
					if (err) {
						return res.send(err);
					}
					return res.send(item);
				});
				//r
			}
		});
	} else {
		return res.status(400).json(err);
	}
});

module.exports = router;
