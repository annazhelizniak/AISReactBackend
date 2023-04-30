const db = require("./dbProperties")

exports.CategoriesDao = class {
    constructor() {
    }
    // private static String GET_ALL = "SELECT * FROM `category` ORDER BY category_name";
    // private static String GET_BY_ID = "SELECT * FROM `category` WHERE category_number=?";
    // private static String CREATE = "INSERT INTO `category` (category_name) VALUES (?)";
    // private static String UPDATE = "UPDATE `category` SET category_name=? WHERE category_number=?";
    // private static String DELETE = "DELETE FROM `category` WHERE category_number=?";
    // private static String SEARCH_CATEGORY_BY_NAME = "SELECT * FROM `category` WHERE LOWER(category_name) LIKE CONCAT('%', LOWER(?), '%')";
    // private static String SEARCH_CATEGORY_IN_CHECK = "SELECT * FROM `category` WHERE category_number IN "
    //     + "(SELECT category_number FROM `product` WHERE id_product IN "
    //     + "(SELECT id_product FROM `store_product` WHERE upc IN "
    //     + "(SELECT upc FROM `upc` WHERE check_number IN "
    //     + "(SELECT check_number FROM `sale`))))";
    // private static String SEARCH_CATEGORY_FROM_STORE = "SELECT * FROM `category` WHERE category_number IN "
    //     + "(SELECT category_number FROM `product` WHERE id_product IN "
    //     + "(SELECT id_product FROM `store_product` WHERE upc IN "
    //     + "(SELECT upc FROM `upc`)))";


    getAllCategories() {
        return new Promise((resolve, reject) => {
            db.connection.query(
                `SELECT * FROM ${db.CATEGORY_DB} ORDER BY category_name`,
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

    getCategory(category_number) {

        return new Promise(function (resolve) {

            db.connection.query(`SELECT * FROM ${db.CATEGORY_DB} WHERE id_employee = ${category_number}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }



    addCategory(category_name) {

        return new Promise(function (resolve) {
            db.connection.query(
                `INSERT INTO ${db.CATEGORY_DB} (category_name) VALUES ('${category_name}')`,
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

    updateCategory(category_number,category_name) {
//console.log(category_number+category_name)
        return new Promise(function (resolve) {
            db.connection.query(
                `
                    UPDATE ${db.CATEGORY_DB} 
                    SET
                    category_name = '${category_name}'
                    WHERE category_number = '${category_number}'
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


    deleteCategory(id) {
        return new Promise(function (resolve) {
            db.connection.query(
                `DELETE FROM ${db.CATEGORY_DB} WHERE category_number= ${id}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }

    searchByName(name) {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.CATEGORY_DB} WHERE LOWER(category_name) LIKE CONCAT('%', LOWER(${name}), '%')`,
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

    // private static String SEARCH_CATEGORY_IN_CHECK = "SELECT * FROM `category` WHERE category_number IN "
    //     + "(SELECT category_number FROM `product` WHERE id_product IN "
    //     + "(SELECT id_product FROM `store_product` WHERE upc IN "
    //     + "(SELECT upc FROM `upc` WHERE check_number IN "
    //     + "(SELECT check_number FROM `sale`))))";
    // private static String SEARCH_CATEGORY_FROM_STORE = "SELECT * FROM `category` WHERE category_number IN "
    //     + "(SELECT category_number FROM `product` WHERE id_product IN "
    //     + "(SELECT id_product FROM `store_product` WHERE upc IN "
    //     + "(SELECT upc FROM `upc`)))";
    // searchCategoryInCheck(name) {
    //     return new Promise(function (resolve) {
    //         db.connection.query(
    //             `SELECT * FROM ${db.CATEGORY_DB} WHERE category_number IN `
    //             + `(SELECT category_number FROM ${db.PRODUCT_DB} WHERE id_product IN `
    //             + `(SELECT id_product FROM ${db.STORE_PRODUCT_DB} WHERE upc IN `
    //             + `(SELECT upc FROM `upc` WHERE check_number IN `
    //             + `(SELECT check_number FROM `sale`))))`;
    //             `SELECT * FROM ${db.CATEGORY_DB} WHERE LOWER(category_name) LIKE CONCAT('%', LOWER(${name}), '%')`,
    //             (err, results) => {
    //                 if (err) {
    //                     console.log(err)
    //                     resolve(false)
    //                 }
    //                 resolve(results)
    //             }
    //         )
    //     })
    // }


}

exports.dao = new exports.CategoriesDao()
