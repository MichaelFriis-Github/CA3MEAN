var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
    _id: Number,
    name: String,
    description: String
});

exports.CategoryModel = mongoose.model('categories', CategorySchema);

var ProductSchema = mongoose.Schema({
    _id: Number,
    name: String,
    categoryId: Number,
    quantityPerUnit: String,
    unitPrice: Number,
    unitsInStock: Number,
    unitsOnOrder: Number,
    reorderLevel: Number,
    discontinued: Number
});

exports.ProductModel = mongoose.model('products', ProductSchema);

var DetailsSchema = mongoose.Schema({
    orderId: Number,
    productId: Number,
    unitPrice: Number,
    quantity: Number,
    discount: Number
});

exports.DetailsModel = mongoose.model('orderdetails', DetailsSchema);

var CustomerSchema = mongoose.Schema({
    _id: String,
    companyName: String,
    contactName: String,
    contactTitle: String,
    address: String,
    city: String,
    region: String,
    postalCode: String,
    country: String,
    phone: String,
    fax: String
});

exports.CustomerModel = mongoose.model('customers', CustomerSchema);

var EmployeeSchema = mongoose.Schema({
    _id: Number,
    lastName: String,
    firstName: String,
    title: String,
    titleOfCourtesy: String,
    birthDate: String,
    hireDate: String,
    address: String,
    city: String,
    region: String,
    postalCode: String,
    country: String,
    homePhone: String,
    extension: String,
    notes: String
});

exports.EmployeeModel = mongoose.model('employees', EmployeeSchema);

var OrderSchema = mongoose.Schema({
    _id: Number,
    customerId: String,
    employeeId: Number,
    orderDate: String,
    requiredDate: String,
    shippedDate: String,
    shipVia: String,
    freight: Number,
    shipName: String,
    shipAddress: String,
    shipCity: String,
    shipRegion: String,
    shipPostalCode: String,
    shipCountry: String
});


function getAllCategories(callback) {
    Categories.find({}, function (err, categories) {
        if (err) {
            return callback(err);
        }
        callback(null,categories);
    });
}

exports.OrderModel = mongoose.model('orders', OrderSchema);

