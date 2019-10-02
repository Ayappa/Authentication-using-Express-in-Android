var jsonobj = require("./discount");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Item = require("../models/ItemAdd");

router.get("/", auth, (req, res) => {
	if (res) {
		res.json(jsonobj);
	} else {
		return res.status(400).json(err);
	}
});


router.post("/", auth, (req, res) => {
	if (res) {
		res.json(jsonobj);
		const { image,name,price,count} = req.body;
		Item.findOne({ userId: req.user.id }, (error, item) => {
			if(item){
				Item.findByIdAndUpdate({name}, {$set:{count:count+1}}, (error, item) => {
					if(item){
                    
					}else{
						item=new Item({userId: req.user.id ,image,name,price,count:1})
					}
				});
			}
		});
	} else {
		return res.status(400).json(err);
	}
});

module.exports = router;
