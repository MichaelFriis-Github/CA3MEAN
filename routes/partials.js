var express = require('express');
var fs = require('fs');
var mongoose = require ("mongoose");
var model = require('../database/model');
var db = mongoose.connect("mongodb://test:test@ds047440.mongolab.com:47440/ca");
db.connection.once('open', function() {
    console.log("Connected");
});
db.connection.on('error', function(err) {
    console.log(err);
    console.log('Did you remember to start MongodDb?');
});


//var jokes = require("../model/jokes");

var router = express.Router();

var path = __dirname.substr(0,__dirname.lastIndexOf("\\"));  //Remove the routes part

var abe = {"employees":[
    {"firstName":"John", "lastName":"Doe"},
    {"firstName":"Anna", "lastName":"Smith"},
    {"firstName":"Peter", "lastName":"Jones"}
]}


router.get('/home', function(req, res) {
   res.render('home',{group : "Michael, Frederik, Mads, Sune"});
  });

router.get('/allmembers', function(req, res) {

      //  res.render('allmembers', { members : ['hello', 'world']});
        model.CustomerModel.find({}, function (err, allmembers) {
            if (err) {
                return callback(err);
            }
            res.render('allmembers', { members : allmembers});
        });

    });

//router.get('/allmembers', function (req, res) {
//    model.getAllCategories(function (err, allCategories) {
//        if (err) {
//            return err;
//        }
//        console.log(allCategories);
//        res.render('allJokes', {jokes: model.CategoryModel.allCategories.category});
//    })
//});

module.exports = router;