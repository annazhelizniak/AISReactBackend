const db = require("./dbProperties")

exports.SaleDao = class {
    constructor() {
    }

    getAllSales() {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.SALE_DB} O`,
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

    getSale(upc,check_number) {

        return new Promise(function (resolve) {

            db.connection.query(`SELECT * FROM ${db.SALE_DB} WHERE upc = ${upc} AND check_number = ${check_number}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }
    addSale(upc,check_number,product_number,selling_price) {
        return new Promise(function (resolve) {
            db.connection.query(
                `INSERT INTO ${db.SALE_DB} (upc,check_number,product_number,selling_price) VALUES ('${upc}','${check_number}','${product_number}','${selling_price}')`,
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


    updateSale(upc,check_number,product_number,selling_price) {
        return new Promise(function (resolve) {
            db.connection.query(
                `
                    UPDATE ${db.SALE_DB} 
                    SET
      
                    product_number = '${product_number}',
                    selling_price = '${selling_price}'
                    WHERE upc = '${upc}' AND check_number = '${check_number}'
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




    deleteSale(upc,check_number) {

        return new Promise(function (resolve) {
            console.log(upc)
            db.connection.query(
                `DELETE FROM ${db.SALE_DB} WHERE upc = ${upc} AND check_number = ${check_number}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }



}
exports.dao = new exports.SaleDao()
