var fs = require('fs');
var mongoose = require('mongoose');
var model = require('./model');
var dbUrl = "mongodb://test:test@ds047440.mongolab.com:47440/ca";


function readData(path) {
    var file = fs.readFileSync(path, 'utf8');
    var lines = file.split(/[\r]?[\n]/);
    var headers = lines[0].split(',');
    var data = JSON.parse(lines[1]);
    var result = data.map(function(e) {
        var res = {};
        for(var i = 0; i < e.length; i++) {
            if(e[i] !== 'NULL')
                res[headers[i]] = e[i];
        }
        return res;
    })
    return result;
}

function getCustomers() {
    return customers.map(function(customer) {
        return {
            _id: customer.customerID,
            companyName: customer.companyName,
            contactName: customer.contactName,
            contactTitle: customer.contactTitle,
            address: customer.address,
            city: customer.city,
            region: customer.region,
            postalCode: customer.postalCode,
            country: customer.country,
            phone: customer.phone,
            fax: customer.fax
        };
    });
};

function getEmployees() {
    return employees.map(function(emp) {
        return {
            _id: emp.employeeID,
            lastName: emp.lastName,
            firstName: emp.firstName,
            title: emp.title,
            titleOfCourtesy: emp.titleOfCourtesy,
            birthDate: emp.birthDate.substring(0, 10),
            hireDate: emp.hireDate.substring(0, 10),
            address: emp.address,
            city: emp.city,
            region: emp.region,
            postalCode: emp.postalCode,
            country: emp.country,
            homePhone: emp.homePhone,
            extension: emp.extension,
            notes: emp.notes
        };
    });
}

function getCategories() {
    return categories.map(function(category) {
        return {
            _id: category.categoryID,
            name: category.categoryName,
            description: category.description
        };
    });
}

function getProducts() {
    return products.map(function(product) {
        return {
            _id: product.productID,
            name: product.productName,
            categoryId: product.categoryID,
            quantityPerUnit: product.quantityPerUnit,
            unitPrice: product.unitPrice,
            unitsInStock: product.unitsInStock,
            unitsOnOrder: product.unitsOnOrder,
            reorderLevel: product.reorderLevel,
            discontinued: product.discontinued
        };
    });
}

function getOrderDetails() {
    return order_details.map(function(e) {
        return {
            orderId: e.orderID,
            productId: e.productID,
            unitPrice: e.unitPrice,
            quantity: e.quantity,
            discount: e.discount
        };
    })
}

function getOrders() {
    return orders.map(function(e) {
        return {
            _id: e.orderID,
            customerId: e.customerID,
            employeeId: e.employeeID,
            orderDate: e.orderDate.substring(0, 10),
            requiredDate: e.requiredDate.substring(0, 10),
            shippedDate: e.shippedDate.substring(0, 10),
            shipVia: e.shipVia,
            freight: e.freight,
            shipName: e.shipName,
            shipAddress: e.shipAddress,
            shipCity: e.shipCity,
            shipRegion: e.shipRegion,
            shipPostalCode: e.shipPostalCode,
            shipCountry: e.shipCountry
        };
    });
};

var categories = readData('categories.json');
var customers = readData('customers.json');
var employees = readData('employees.json');
var order_details = readData('order_details.json');
var orders = readData('orders.json');
var products = readData('products.json');

var db = mongoose.connect(dbUrl);
db.connection.once('open', function() {
    console.log("Connected");
});
db.connection.on('error', function(err) {
    console.log(err);
    console.log('Did you remember to start MongodDb?');
});

model.CategoryModel.remove({}).exec();
model.ProductModel.remove({}).exec();
model.EmployeeModel.remove({}).exec();
model.CustomerModel.remove({}).exec();
model.DetailsModel.remove({}).exec();
model.OrderModel.remove({}).exec();

var done = [0,0,0,0,0,0];


function closeDatabase() {
    for(var i = 0; i < done.length; i++) {
        if(done[i] == 0) {
            return;
        }
    }
    db.connection.close();
}

function addData(data, dataModel, doneIndex) {
    //console.log(data);
    var count = 0;
    data.forEach(function(e) {
        var element = new dataModel(e);
        element.save(function(err, order) {
            if(err) console.log(err);
            count++;
            if(count >= data.length) {
                done[doneIndex] = true;
                closeDatabase()
            }
        });
    });
}




addData(getOrders(), model.OrderModel, 0);
addData(getOrderDetails(), model.DetailsModel, 1);
addData(getProducts(), model.ProductModel, 2);
addData(getEmployees(), model.EmployeeModel, 3);
addData(getCustomers(), model.CustomerModel, 4);
addData(getCategories(), model.CategoryModel, 5);





