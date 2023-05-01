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
                `SELECT  card_number FROM  ${db.CUSTOMER_CARD_DB} p WHERE
            not EXISTS
            (SELECT * FROM ${db.EMPLOYEE_DB}  WHERE  id_employee NOT IN
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

// Знайти
    getkasirsForAllClients() {
        return new Promise((resolve, reject) => {
            db.connection.query(
                `SELECT   * FROM  ${db.EMPLOYEE_DB} p WHERE
            not EXISTS
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

//3.1! Знайти коди та назви продуктів  певної категорії, які є в кількох цінах


    getProductsInCategoryinDifferentPrice(category_number) {

        return new Promise(function (resolve) {

            db.connection.query(
                `SELECT id_product, product_name FROM ${db.PRODUCT_DB} WHERE category_number='${category_number}' AND id_product IN (SELECT id_product     FROM ${db.STORE_PRODUCT_DB}     GROUP BY id_product  HAVING COUNT(DISTINCT selling_price) > 1 ))`,
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
AND id_product IN (SELECT id_product     FROM ${db.STORE_PRODUCT_DB}     GROUP BY id_product     HAVING COUNT(DISTINCT products_number) > 1 )`,
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
