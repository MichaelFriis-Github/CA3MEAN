var express = require('express');
var fs = require('fs');
var dbconnect = require('../database/dbconnect');
var model = require('../database/model');


dbconnect.connect();

var router = express.Router();

var path = __dirname.substr(0, __dirname.lastIndexOf("\\"));  //Remove the routes part

router.get('/home', function (req, res) {
    res.render('home', {group: "Michael, Frederik, Mads, Sune"});
});

router.get('/orders', function (req, res) {

    model.OrderModel.find({}, function (err, allorders) {
        if (err) {
            return callback(err);
        }
        res.render('allorders', {orders: allorders});
    });

});

module.exports = router;