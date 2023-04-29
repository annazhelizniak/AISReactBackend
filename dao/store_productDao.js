const db = require("./dbProperties")

exports.Store_productDao = class {
    constructor() {
    }




    getAllStore_product() {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.STORE_PRODUCT_DB} ORDER BY 'category_name'`,
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

    getStoreProduct(upc) {

        return new Promise(function (resolve) {

            db.connection.query(`SELECT * FROM ${db.STORE_PRODUCT_DB} WHERE upc = ${upc}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }
    addStore_product(upc, upc_prom,id_product,selling_price,products_number,promotional_product) {
        return new Promise(function (resolve) {
            db.connection.query(
                `INSERT INTO ${db.STORE_PRODUCT_DB} (upc,upc_prom,id_product,selling_price,products_number,promotional_product) VALUES ('${upc}','${upc_prom}','${id_product}','${selling_price}','${products_number}','${promotional_product}')`,
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

    addStore_product1(upc, id_product,selling_price,products_number,promotional_product) {
        return new Promise(function (resolve) {
            db.connection.query(
                `INSERT INTO ${db.STORE_PRODUCT_DB} (upc,id_product,selling_price,products_number,promotional_product) VALUES ('${upc}','${id_product}','${selling_price}','${products_number}','${promotional_product}')`,
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

    updateStore_product(upc,upc_prom,id_product,selling_price,products_number,promotional_product) {
        return new Promise(function (resolve) {
            db.connection.query(
                `
                    UPDATE ${db.STORE_PRODUCT_DB} 
                    SET
                    upc_prom = '${upc_prom}',
                    id_product = '${id_product}',
                    selling_price = '${selling_price}',
                    products_number = '${products_number}',
                    promotional_product = '${promotional_product}'
                    WHERE upc = ${upc}
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

    updateStore_product1(upc,id_product,selling_price,products_number,promotional_product) {
        return new Promise(function (resolve) {
            db.connection.query(
                `
                    UPDATE ${db.STORE_PRODUCT_DB} 
                    SET
                    upc_prom = NULL,
                    id_product = '${id_product}',
                    selling_price = '${selling_price}',
                    products_number = '${products_number}',
                    promotional_product = '${promotional_product}'
                    WHERE upc = ${upc}
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


    deleteStore_product(id) {
        return new Promise(function (resolve) {
            db.connection.query(
                `DELETE FROM ${db.STORE_PRODUCT_DB} WHERE upc= ${id}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }



    getAllStore_productWithProductCharacteristics() {

        return new Promise(function (resolve) {

            db.connection.query(
                `SELECT product_name FROM ${db.PRODUCT_DB} INNER JOIN ${db.STORE_PRODUCT_DB} ON product.id_product = store_product.id_product ORDER BY 'products_number'`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    console.log(results)
                    resolve(results)
                }
            )
        })
    }



}
exports.dao = new exports.Store_productDao()
