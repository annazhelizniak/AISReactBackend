const db = require("./dbProperties")

exports.AdditionalFunctionsDao = class {
    constructor() {
    }
    //Знайти upc магазинів, які мають чеки всіх працівників
    getupcForAllWorkers() {
        return new Promise((resolve, reject) => {
            db.connection.query(
                 `SELECT upc FROM ${db.SALE_DB} WHERE check_number NOT IN ( SELECT DISTINCT check_number FROM ${db.CHECK_DB} WHERE NOT EXISTS ( SELECT * FROM ${db.EMPLOYEE_DB}  WHERE employee.id_ employee = check.id_ employee )`,
                

                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }


// Знайти upc магазинів, які мають чеки всіх клієнтів
    getupcForAllCustomers() {
        return new Promise((resolve, reject) => {
            db.connection.query(
                `SELECT upc FROM ${db.SALE_DB} WHERE check_number NOT IN ( SELECT DISTINCT check_number FROM ${db.CHECK_DB} 
WHERE NOT EXISTS ( SELECT * FROM ${db.CUSTOMER_CARD_DB}  WHERE customer_card.card_number = check.card_number )`,

                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }

// Знайти upc магазинів, які мають товари всіх категорій
    getupcForAllCategories() {
        return new Promise((resolve, reject) => {
            db.connection.query(
                `SELECT upc FROM ${db.STORE_PRODUCT_DB} WHERE id_product NOT IN ( SELECT DISTINCT id_product FROM ${db.PRODUCT_DB} 
WHERE NOT EXISTS ( SELECT * FROM ${db.CATEGORY_DB}  WHERE category.category_number = product.category_number )`,

                (err, results) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }

//3.1! Знайти коди та назви продуктів  певної категорії, які є в кількох цінах


    getProductsInCategoryinDifferentPrice(category_number) {

        return new Promise(function (resolve) {

            db.connection.query(
                `SELECT id_product, product_name FROM ${db.PRODUCT_DB} WHERE category_number='${category_number}' AND id_product IN (SELECT id_ product     FROM ${db.STORE_PRODUCT_DB}     GROUP BY id_ product     HAVING COUNT(DISTINCT selling_price) > 1 )`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }

// 3.1! Знайти коди та назви продуктів , певних категорій, які є в різних кількостях

    getProductsInCategoryinDifferentNumber(category_number) {

        return new Promise(function (resolve) {

            db.connection.query(
                `SELECT id_product, product_name FROM ${db.PRODUCT_DB} WHERE category_number='${category_number}' 
AND id_product IN (SELECT id_ product     FROM ${db.STORE_PRODUCT_DB}     GROUP BY id_ product     HAVING COUNT(DISTINCT product_number) > 1 )`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }

//
// 3.1! Знайти коди та назви категорій , які є в різних товарах(товари мають бути певного виробника)(
    getCategoryinDifferentProductsserteinProducer(producer) {

        return new Promise(function (resolve) {

            db.connection.query(
                `SELECT category_number, category_name FROM ${db.CATEGORY_DB} WHERE category_number IN (SELECT category_number 
    FROM ${db.PRODUCT_DB}   WHERE producer='${producer}'   GROUP BY category_number     HAVING COUNT(DISTINCT id_product) > 1 )`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }

}

exports.dao = new exports.AdditionalFunctionsDao()
