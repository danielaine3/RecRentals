var express = require("express");
var rentals = require ("../models/rentals_no_seq.js");
var router = express.Router();
router.get("/", function(req, res) {
	rentals.selectAll(function(data) {
		res.render("home");
	});		
});
router.get("/renter", function(req, res) {
	rentals.selectAll(function(data) {
		res.render("usersearch");
	});		
});
router.get("/api/rental/", function(req,res) {
	rentals.selectAll(function(data) {
		res.json(data);
	});
});
router.get("/owner", function(req,res) {
	var condition = "owner = " + req.params.name;
	rentals.selectAll(function(data) {
		var hbsObject = {
			rentals:data
		};
		res.render("owner");
	});
});
router.get("/api/rentals", function(req, res) {
	console.log('route: get /api/rentals');
	res.json({success: true});
});
router.post("/api/rentals", function(req, res) {
	console.log('Hits route');
	rentals.insertOne(
		req.body.username, req.body.item, req.body.rate, req.body.owner, req.body.location, 
		req.body.category, req.body.description
		, function(result) {
			console.log(JSON.stringify(result));
			res.json({id: result.insertId});
		}
	);
});
router.put("/api/rentals/:id", function(req, res) {
	var condition = "id = " + req.params.id;
	console.log("condition", condition);
	rentals.update({
		item: req.body.item,
		rate: req.body.rate, 
		location: req.body.location, 
		category: req.body.category, 
		imgURL: req.body.imgURL, 
		description: req.body.description
	}, condition, function(result) {
		if (result.changedRows == 0) {
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});
router.delete("/api/rentals/:id", function(req, res) {
	var condition = "id = " + req.params.id;
	rentals.delete(condition, function(result) {
		if (result.affectedRows == 0) {
			return res.status(404).end();
		} else {
			res.status(200).end();
		}
	});
});
module.exports = router;