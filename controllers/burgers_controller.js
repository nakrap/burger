// Import express and router.
var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic.
router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    var newBurger = [req.body.name];
    
    console.log(newBurger);

  burger.create(['burger_name', 'devoured'],[newBurger, false], function(result) {
    res.json({ id: result.insertId });
    // res.redirect("/");
    // console.log(result.insertId);
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update(req.body, condition, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        //   res.redirect("/");
          res.status(200).end();
      }
    });
});

// Export routes for server.js to use.
module.exports = router;