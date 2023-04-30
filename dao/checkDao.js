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

    // private static String ALL_PRODUCTS_IN_CHECK = "SELECT * FROM `product` WHERE id_product IN "
    //     + "(SELECT id_product FROM `store_product` WHERE upc IN "
    //     + "(SELECT upc FROM `upc` WHERE check_number IN "
    //     + "(SELECT check_number FROM `sale`)))";

    getProductsFromXCheck(check_number) {

        return new Promise(function (resolve) {


            db.connection.query(
                `SELECT * FROM (${db.PRODUCT_DB} INNER JOIN ${db.STORE_PRODUCT_DB} ON product.id_product = store_product.id_product) WHERE upc IN 
                (SELECT upc FROM ${db.SALE_DB} WHERE check_number = '${check_number}')`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }

}
exports.dao = new exports.CheckDao()
