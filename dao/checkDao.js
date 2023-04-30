const db = require("./dbProperties")

exports.CheckDao = class {
    constructor() {
    }

    getAllChecks() {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.CHECK_DB} ORDER BY print_date`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    resolve(results)
                }
            )
        })
    }

    getCheck(check_number) {

        return new Promise(function (resolve) {

            db.connection.query(`SELECT * FROM ${db.CHECK_DB} WHERE check_number = ${check_number}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }
    addCheck(check_number,id_employee,card_number,print_date,sum_total,vat) {
        return new Promise(function (resolve) {
            db.connection.query(
                `INSERT INTO ${db.CHECK_DB} (check_number,id_employee,card_number,print_date,sum_total,vat) VALUES ('${check_number}','${id_employee}','${card_number}','${print_date}','${sum_total}','${vat}')`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(err)
                    }
                    resolve(results)
                }
            )
        })

    }

    addCheck1(check_number,id_employee,print_date,sum_total,vat) {
        return new Promise(function (resolve) {
            db.connection.query(
                `INSERT INTO ${db.CHECK_DB} (check_number,id_employee,print_date,sum_total,vat) VALUES ('${check_number}','${id_employee}','${print_date}','${sum_total}','${vat}')`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(err)
                    }
                    resolve(results)
                }
            )
        })

    }

    updateCheck(check_number,id_employee,card_number,print_date,sum_total,vat) {
        return new Promise(function (resolve) {
            db.connection.query(
                `
                    UPDATE ${db.CHECK_DB} 
                    SET
      
                    id_employee = '${id_employee}',
                    card_number = '${card_number}',
                    print_date = '${print_date}',
                    sum_total = '${sum_total}',
                    vat = '${vat}'
                    WHERE check_number = '${check_number}'
                `,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(err)
                    }
                    resolve(results)
                }
            )
        })
    }

    updateCheck1(check_number,id_employee,print_date,sum_total,vat) {
        return new Promise(function (resolve) {
            db.connection.query(
                `
                    UPDATE ${db.CHECK_DB} 
                    SET
      
                    id_employee = '${id_employee}',
                    card_number = NULL,
                    print_date = '${print_date}',
                    sum_total = '${sum_total}',
                    vat = '${vat}'
                    WHERE check_number = '${check_number}'
                `,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(err)
                    }
                    resolve(results)
                }
            )
        })
    }


    deleteCheck(id) {
        return new Promise(function (resolve) {
            db.connection.query(
                `DELETE FROM ${db.CHECK_DB} WHERE check_number= ${id}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }

    getMaxCheck(){
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT MAX(check_number) AS last_id FROM ${db.CHECK_DB}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    resolve(results)
                }
            )
        })
    }

    getProductsFromXCheck(check_number) {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM (${db.PRODUCT_DB} INNER JOIN ${db.STORE_PRODUCT_DB} ON product.id_product = store_product.id_product) WHERE upc IN 
                (SELECT upc FROM ${db.SALE_DB} WHERE check_number = '${check_number}' ORDER BY print_date)`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }

    // private static String CHECKS_OF_KASIR_FOR_PERIOD = "SELECT * FROM `check` WHERE id_employee=? AND print_data BETWEEN ? AND ? ORDER BY print_data";
    getAllChecksByCashierForPeriod(id_employee,print_date_start,print_date_end){
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM  ${db.CHECK_DB} WHERE id_employee = ${id_employee} AND DATE(print_date) BETWEEN '${print_date_start}' AND '${print_date_end}' ORDER BY print_date`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    resolve(results)
                }
            )
        })
    }

    getAllChecksByAllCashiersForPeriod(print_date_start,print_date_end){
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM  ${db.CHECK_DB} WHERE DATE(print_date) BETWEEN '${print_date_start}' AND '${print_date_end}' ORDER BY print_date`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    resolve(results)
                }
            )
        })
    }
    getSumChecksByCashierForPeriod(id_employee,print_date_start,print_date_end){
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT SUM(sum_total) AS sum FROM  ${db.CHECK_DB} WHERE id_employee = ${id_employee} AND DATE(print_date) BETWEEN '${print_date_start}' AND '${print_date_end}' ORDER BY print_date`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    resolve(results)
                }
            )
        })
    }
    getSumChecksByAllCashiersForPeriod(print_date_start,print_date_end){
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT SUM(sum_total) AS sum FROM  ${db.CHECK_DB} WHERE DATE(print_date) BETWEEN '${print_date_start}' AND '${print_date_end}' ORDER BY print_date`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    resolve(results)
                }
            )
        })
    }

    // private static String AMOUNT_OF_PRODUCT_SAILED_IN_PERIOD = "SELECT product_name"
    //     + " FROM `product` JOIN `store_product` USING(id_product) JOIN 'sale' USING(upc) JOIN 'check' USING(check_number)"
    //     + " WHERE id_product=? AND print_data BETWEEN ? AND ?";

    getAmountOfProductSailedForPeriod(id_product,date_start,date_end){
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT SUM(product_number) AS amount FROM ${db.PRODUCT_DB} JOIN ${db.STORE_PRODUCT_DB} USING(id_product) JOIN ${db.SALE_DB} USING(upc) JOIN ${db.CHECK_DB} USING(check_number)
                 WHERE id_product = '${id_product}' AND DATE(print_date) BETWEEN '${date_start}' AND '${date_end}'`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    resolve(results)
                }
            )
        })
    }



}
exports.dao = new exports.CheckDao()
