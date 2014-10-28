var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    //Will be true when the "login" part has been completed
    if (typeof req.session != "undefined") {
        var user = req.session.user;
        res.render("main.ejs", {user: user});
    }
    else {
        res.render("main.ejs", {user: user});
    }
});

module.exports = router;
