/**
 * Created by Michael on 28-10-2014.
 */
var mongoose = require ('mongoose');

    module.exports.connect = function (){
    mongoose.connect("mongodb://test:test@ds047440.mongolab.com:47440/ca");

    var db = mongoose.connection;

    db.once('open', function() {
        console.log("Connected");
    });
    db.on('error', function(err) {
        console.log(err);
        console.log('Did you remember to start MongodDb?');
    });
};