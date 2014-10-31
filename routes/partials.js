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

router.get('/categories', function (req, res) {

    model.CategoryModel.find({}, function (err, allcategories) {
        if (err) {
            return callback(err);
        }
        res.render('allcategories', {categories: allcategories});
    });

});

router.get('/employees', function (req, res) {

    model.EmployeeModel.find({}, function (err, allemployees) {
        if (err) {
            return callback(err);
        }
        res.render('allemployees', {employees: allemployees});
    });

});

router.get('/categorydetail/:id', function (req, res){
    console.log("In categorydetail");
    var id = req.params.id;
    model.ProductModel.find({categoryId:id}, function(err, categoryId){
        if (err)
        {
            return callback(err);
        }
        else
        {
            res.render('categorydetail', {categorydetail: categoryId});
        }
    });
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
            callback(err);
        }
        else
        {
            res.render('deletion.ejs');
        }
    });
});

router.get('/edit/:id', function (req, res) {
    var id = req.params.id;
    model.OrderModel.find({_id:id}, function(err, orderID) {
        if (err) {
            return callback(err);
        } else {
            res.render('edit', {orders: orderID});
        }
    });
});

router.post('/edit/:id', function (req, res) {
    var id = req.params.id;
    model.OrderModel.update({_id:id}, {
        $set: {
            shipName: req.body.name.toString(),
            shipAddress: req.body.address.toString()
        }
    }, {multi: true}).exec();
    res.render('deletion.ejs');

});



module.exports = router;