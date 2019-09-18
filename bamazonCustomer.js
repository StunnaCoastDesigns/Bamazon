require('dotenv').config();

var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.database,
});

connection.connect(function (err) {
    if (err) throw err;

    displayProducts();
});

var displayProducts = function () {
    var query = "Select * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
            console.log("Product ID:" + res[i].item_id + " | | Product Name: " + res[i].product_name + " | | Price:" + res[i].price);
        }
        requestProduct();
    });
};

//number of products requested to purchase by customer
var requestProduct = function () {
    inquirer.prompt([{
        name: "productID",
        type: "input",
        message: "Please enter product ID for product selection.",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }, {
        name: "productUnits",
        type: "input",
        message: "How many units do you want?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function (answer) {

        var query = "Select stock_quantity, price, product_sales, department_name FROM products  WHERE  ?";
        connection.query(query, {
            item_id: answer.productID
        }, function (err, res) {

            if (err) throw err;

            var available_stock = res[0].stock_quantity;
            var price_per_unit = res[0].price;
            var productSales = res[0].product_sales;
            var productDepartment = res[0].department_name;

            //checks the amount of inventory to see if there is enough
            if (available_stock >= answer.productUnits) {

                //data passed in to complete purchase
                completePurchase(available_stock, price_per_unit, productSales, productDepartment, answer.productID, answer.productUnits);
            } else {
                console.log("There isn't an Insufficient Stock!  Adjust quantity or try making another selection");
                //  user may request a new product
                requestProduct();
            }
        });
    });
};

var completePurchase = function (availableStock, price, productSales, productDepartment, selectedProductID, selectedProductUnits) {
    var updatedStockQuantity = availableStock - selectedProductUnits;

    var totalPrice = price * selectedProductUnits;

    var updatedProductSales = parseInt(productSales) + parseInt(totalPrice);

    //updates stock quanity
    var query = "UPDATE products SET  ?  WHERE  ?";
    connection.query(query, [{
        stock_quantity: updatedStockQuantity,
        product_sales: updatedProductSales
    }, {
        item_id: selectedProductID
    }], function (err, res) {
        if (err) throw err;
        //tells user of successful purchase
        console.log("Yay, your purchase is complete");
        //display purchase price
        console.log("We have received your payment in the amount of : " + totalPrice);
        //departments revenue is being updated here
        updateDepartmentProfits(updatedProductSales, productDepartment);
        //news produ/cts will be displayed for user selection here
    });

};

var updateDepartmentProfits = function (updatedProductSales, productDepartment) {

    //query database for total sales value of department
    var query = "Select total_sales FROM departments WHERE ?";
    connection.query(query, {
        department_name: productDepartment
    }, function (err, res) {
        if (err) throw err;

        var departmentSales = res[0].total_sales;

        var updatedDepartmentSales = parseInt(departmentSales) + parseInt(updatedProductSales);

        //completes updated sales totals for all departments
        completeDepartmentSalesUpdate(updatedDepartmentSales, productDepartment);
    });
};

var completeDepartmentSalesUpdate = function (updatedDepartmentSales, productDepartment) {
    var query = "UPDATE departments SET ? WHERE ?";
    connection.query(query, [{
        total_sales: updatedDepartmentSales
    }, {
        department_name: productDepartment
    }], function (err, res) {
        if (err) throw err;

        //displays products so user can choose to make another purchase.
        displayProducts();
    });

};