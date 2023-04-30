const db = require("./dbProperties")

exports.ProductsDao = class {
    constructor() {
    }

    getProducts() {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.PRODUCT_DB} ORDER BY 'product_name'`,
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

    getProduct(id_product) {

        return new Promise(function (resolve) {

            db.connection.query(`SELECT * FROM ${db.PRODUCT_DB} WHERE id_product = ${id_product}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }


    addProduct(category_number, product_name, producer, characteristics) {

        return new Promise(function (resolve) {
            db.connection.query(
                `INSERT INTO ${db.PRODUCT_DB} (category_number, product_name, producer,characteristics) VALUES ('${category_number}', '${product_name}', '${producer}','${characteristics}')`,
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

    updateProduct(id_product, category_number, product_name, producer, characteristics) {

        return new Promise(function (resolve) {
            db.connection.query(
                `
      UPDATE ${db.PRODUCT_DB} 
      SET
        category_number = '${category_number}',
        product_name = '${product_name}',
        producer = '${producer}',
        characteristics = '${characteristics}'
      WHERE id_product = '${id_product}'
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


    deleteProduct(id) {
        return new Promise(function (resolve) {
            db.connection.query(
                `DELETE FROM ${db.PRODUCT_DB} WHERE id_product= ${id}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }

    getMaxProduct(){
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT MAX(id_product) AS last_id FROM ${db.PRODUCT_DB}`,
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



    //
    // private static String ALL_PRODUCTS_WITH_CHARACTERISTICS = "SELECT * FROM `product` WHERE characteristics=?";
    // private static String ALL_PRODUCTS_FROM_STORE_PRODUCER = "SELECT * FROM `product` WHERE id_product IN "
    //     + "(SELECT id_product FROM `store_product`) AND producer=?";
    // private static String ALL_PRODUCTS_FROM_STORE_FROM_CATEGORY   = "SELECT * FROM `product` WHERE id_product IN "
    //     + "(SELECT id_product FROM `store_product`) AND category=?";
    // private static String ALL_PRODUCTS_IN_CHECK = "SELECT * FROM `product` WHERE id_product IN "
    //     + "(SELECT id_product FROM `store_product` WHERE upc IN "
    //     + "(SELECT upc FROM `upc` WHERE check_number IN "
    //     + "(SELECT check_number FROM `sale`)))";
    //
    // private static String ALL_PRODUCTS_IN_CHECK_PRODUCER ="SELECT * FROM `product` WHERE id_product IN "
    //     + "(SELECT id_product FROM `store_product` WHERE upc IN "
    //     + "(SELECT upc FROM `upc` WHERE check_number IN "
    //     + "(SELECT check_number FROM `sale`))) AND producer = ?";
    //
    // private static String ALL_PRODUCTS_IN_CHECK_FROM_CATEGORY ="SELECT * FROM `product` WHERE id_product IN "
    //     + "(SELECT id_product FROM `store_product` WHERE upc IN "
    //     + "(SELECT upc FROM `upc` WHERE check_number IN "
    //     + "(SELECT check_number FROM `sale`))) AND category_number=?";
    // private static String ALL_PRODUCTS_IN_CHECK_WITH_CHARACTERISTICS ="SELECT * FROM `product` WHERE id_product IN "
    //     + "(SELECT id_product FROM `store_product` WHERE upc IN "
    //     + "(SELECT upc FROM `upc` WHERE check_number IN "
    //     + "(SELECT check_number FROM `sale`))) AND characteristics=?";
    getProductsFromStoreWithCharacteristics(characteristics) {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.PRODUCT_DB} WHERE id_product IN `
                + `(SELECT id_product FROM ${db.STORE_PRODUCT_DB}) AND characteristics= ${characteristics}`,
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


    getProductsByProducer(producer) {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.PRODUCT_DB} WHERE producer='${producer}'`,
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

    getProductsFromCategory(category) {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.PRODUCT_DB} WHERE category_number ='${category}' ORDER BY product_name`,
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
    //LOWER(category_name) LIKE CONCAT('%', LOWER(${name}), '%')`
    getProductsByName(name) {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.PRODUCT_DB} WHERE LOWER(product_name) LIKE CONCAT('%', LOWER(${name}), '%')`,
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
    // private static String ALL_PRODUCTS_FROM_STORE_SORTED_BY_NAME = "SELECT * FROM `product` WHERE id_product IN "
    //     + "(SELECT id_product FROM `store_product`) ORDER BY product_name";
    getProductsWithCharacterisctics(characteristics) {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.PRODUCT_DB} WHERE id_product IN `
                + `(SELECT id_product FROM ${db.STORE_PRODUCT_DB}) AND characteristics= ${characteristics}`,
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

exports.dao = new exports.ProductsDao()