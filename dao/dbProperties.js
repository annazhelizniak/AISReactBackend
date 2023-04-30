const mysql = require("mysql");

exports.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345a',
    database: 'zlagoda'
});

exports.connection.connect();

exports.EMPLOYEE_DB = "employee"
exports.CATEGORY_DB = "category"
exports.PRODUCT_DB = "product"
exports.STORE_PRODUCT_DB = "store_product"
exports.CHECK_DB = "check_"
exports.CUSTOMER_CARD_DB ="customer_card"
exports.SALE_DB ="sale"

exports.integerGuard = function (sentId) {
    const isInteger = /^[0-9]\d*$/;
    if(!(isInteger.test(sentId))){
        throw "Invalid id value: " + sentId;
    }
}

exports.stringGuard = function (sentString) {
    const isOkString = /^(?!['"-])*/;
    if(!(isOkString.test(sentString))) {
        throw "Invalid string input: " + sentString;
    }
}