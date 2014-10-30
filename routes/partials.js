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

router.get('/products', function (req, res) {
    model.ProductModel.find({}, function (err, products) {
        if (err) {
            return callback(err);
        }
        res.render('products', {products: products});
    });

});


router.get('/orderdetail/:id', function (req, res){
    var id = req.params.id;
    model.DetailsModel.find({orderId:id}, function(err, orderID){
        if (err)
        {
            return callback(err);
        }
        else
        {
            res.render('orderdetail', {orderdetail: orderID});
        }
    });
});

router.get('/orders/delete/:id', function (req, res){
    var id = req.params.id;
    model.OrderModel.findByIdAndRemove({_id:id}, function(err, docs){
        if (err)
        {
            return callback(err);
        }
        else
        {
            res.render('deletion.ejs');
        }
    });
});


module.exports = router;