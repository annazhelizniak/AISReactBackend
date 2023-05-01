const db = require("./dbProperties")

exports.AdditionalFunctionsDao = class {
    constructor() {
    }

    //Знайти прізвища лекторів, які читають усі предмети (5 різних запитів).
    //SELECT кл(upc), Прізвище(id_product)
    // FROM лектор(store_product)
    // WHERE кл(upc) IN

    // 	( SELECT кл
    // 	  FROM Розклад(Sale) Р
    // 	  WHERE NOT EXISTS

    // 	 	( SELECT кп(check_number)
    // 	 	  FROM Предмет(check)
    // 		  WHERE кп NOT IN

    // 			( SELECT кп
    // 			  FROM розклад
    // 			  WHERE кл=Р.кл)));
    //Знайти upc товарів в магазинів, які є у всіх чеках
//`SELECT upc FROM ${db.STORE_PRODUCT_DB} WHERE upc IN
// ( SELECT upc FROM ${db.SALE_DB} P WHERE NOT EXISTS
    //(SELECT check_number FROM ${db.CHECK_DB} WHERE check_number NOT IN
// ( SELECT check_number FROM ${db.SALE_DB}  WHERE check_number = P.check_number)))`,
//знайти товари що є у всіх чеках
    getupcForAllChecks() {
        return new Promise((resolve, reject) => {
            db.connection.query(
                `SELECT upc FROM ${db.STORE_PRODUCT_DB} p WHERE not EXISTS 
                (SELECT * FROM ${db.CHECK_DB} WHERE check_number NOT IN 
                ( SELECT check_number FROM ${db.SALE_DB}  WHERE upc = P.upc))`,
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


// Знайти клієнтів яким виписувати чек всі касири
    getCustomersFromAllKasirs() {
        return new Promise((resolve, reject) => {
            db.connection.query(
                `SELECT  * FROM  ${db.CUSTOMER_CARD_DB} p WHERE
            NOT EXISTS
            (SELECT * FROM ${db.EMPLOYEE_DB}  WHERE empl_role="cashier" AND id_employee NOT IN
            ( SELECT  id_employee FROM  ${db.CHECK_DB} WHERE  card_number = P.card_number))`,
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

// Знайти касирів що видавали чек всім клієнтам
    getkasirsForAllClients() {
        return new Promise((resolve, reject) => {
            db.connection.query(
                `SELECT   * FROM  ${db.EMPLOYEE_DB} p WHERE
            empl_role="cashier" AND NOT EXISTS
            (SELECT * FROM ${db.CUSTOMER_CARD_DB}  WHERE  card_number NOT IN
            ( SELECT  card_number FROM  ${db.CHECK_DB} WHERE  id_employee= P.id_employee))`,

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

//3.1! Знайти коди  продуктів  певної категорії, які є в кількох цінах


    countAmountofProductsForCertainCategory(category_name) {

        return new Promise(function (resolve) {

            db.connection.query(
                `SELECT category.category_name, SUM(store_product.products_number) as total_quantity
FROM ${db.CATEGORY_DB}
JOIN ${db.PRODUCT_DB} ON category.category_number =product.category_number
JOIN ${db.STORE_PRODUCT_DB} ON product.id_product = store_product.id_product
WHERE category.category_name = '${category_name}'
GROUP BY category.category_name`,
 (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }

// 3.1! Знайти коди продуктів , певних категорій, які є в різних кількостях

    getProductsInCategoryinDifferentNumber(n) {

        return new Promise(function (resolve) {

            db.connection.query(
                `SELECT * FROM customer_card WHERE card_number IN (SELECT card_number   FROM check_  GROUP BY card_number  HAVING COUNT(DISTINCT id_employee) >= '${n}')`,
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
