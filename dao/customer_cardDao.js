const db = require("./dbProperties")

exports.CustomerCardDao = class {
    constructor() {
    }

    getAllCards() {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.CUSTOMER_CARD_DB} ORDER BY cust_surname`,
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

    getCard(card_number) {

        return new Promise(function (resolve) {

            db.connection.query(`SELECT * FROM ${db.CUSTOMER_CARD_DB} WHERE card_number = ${card_number}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }
    addCard(card_number,cust_surname,cust_name,cust_patronymic,phone_number,city,street,zip_code,percent) {
        return new Promise(function (resolve) {
            db.connection.query(
                `INSERT INTO ${db.CUSTOMER_CARD_DB} (card_number,cust_surname,cust_name,cust_patronymic,phone_number,city,street,zip_code,percent) VALUES ('${card_number}','${cust_surname}','${cust_name}','${cust_patronymic}','${phone_number}','${city}','${street}','${zip_code}','${percent}')`,
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


    updateCard(card_number,cust_surname,cust_name,cust_patronymic,phone_number,city,street,zip_code,percent) {
        return new Promise(function (resolve) {
            db.connection.query(
                `
                    UPDATE ${db.CUSTOMER_CARD_DB} 
                    SET
      
                    cust_surname = '${cust_surname}',
                    cust_name = '${cust_name}',
                    cust_patronymic = '${cust_patronymic}',
                    phone_number = '${phone_number}',
                    city = '${city}',
                    street = '${street}',
                    zip_code = '${zip_code}',
                    percent = '${percent}'
                    WHERE card_number = '${card_number}'
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




    deleteCard(id) {
        return new Promise(function (resolve) {
            db.connection.query(
                //' ${id}'
                `DELETE FROM ${db.CUSTOMER_CARD_DB} WHERE card_number= ${id}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }
    getCardName(name) {

        return new Promise(function (resolve) {

            db.connection.query(`SELECT * FROM ${db.CUSTOMER_CARD_DB} WHERE cust_name = '${name}'`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }

    getCardSurname(surname) {

        return new Promise(function (resolve) {

            db.connection.query(`SELECT * FROM ${db.CUSTOMER_CARD_DB} WHERE cust_surname = '${surname}'`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }
    getCardPatronymic(cast_patronymic) {

        return new Promise(function (resolve) {

            db.connection.query(`SELECT * FROM ${db.CUSTOMER_CARD_DB} WHERE cust_patronymic = '${cast_patronymic}'`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }
    getCardPhone_number(phone_number) {

        return new Promise(function (resolve) {

            db.connection.query(`SELECT * FROM ${db.CUSTOMER_CARD_DB} WHERE phone_number = '${phone_number}'`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }
    getCardCity(city) {

        return new Promise(function (resolve) {

            db.connection.query(`SELECT * FROM ${db.CUSTOMER_CARD_DB} WHERE city = '${city}'`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }
    getCardstreet(street) {
console.log("aaa")
        return new Promise(function (resolve) {
            console.log("aaa")
            db.connection.query(`SELECT * FROM ${db.CUSTOMER_CARD_DB} WHERE street = '${street}'`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }
    getCardZip(zip) {

        return new Promise(function (resolve) {

            db.connection.query(`SELECT * FROM ${db.CUSTOMER_CARD_DB} WHERE LOWER(zip_code) LIKE CONCAT('%', LOWER('${zip}'), '%')`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }
    getCardPersent(persent) {

        return new Promise(function (resolve) {
            db.connection.query(`SELECT * FROM ${db.CUSTOMER_CARD_DB} WHERE  percent='${persent}' ORDER BY cust_surname`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }
    sEARCH_USERS_WHO_BOUGHT_PRODUCT(product) {

        return new Promise(function (resolve) {
            db.connection.query(
                //todo check
                `SELECT * FROM ${db.CUSTOMER_CARD_DB} WHERE card_number IN (SELECT card_number FROM ${db.CHECK_DB} WHERE check_number IN (SELECT check_number FROM ${db.SALE_DB} WHERE upc IN (SELECT upc FROM ${db.STORE_PRODUCT_DB} WHERE id_product IN (SELECT id_product FROM ${db.PRODUCT_DB} WHERE product_name='${product}')))`,
                
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }
//    private static String SEARCH_USERS_BY_SURNAME = "SELECT * FROM `customer_card` WHERE LOWER(cust_surname) LIKE CONCAT('%', LOWER(?), '%')";
//         private static String SEARCH_USERS_BY_NAME = "SELECT * FROM `customer_card` WHERE LOWER(cust_name) LIKE CONCAT('%', LOWER(?), '%')";
//         private static String SEARCH_USERS_BY_PATRONYMIC= "SELECT * FROM `customer_card` WHERE LOWER(cust_patronymic) LIKE CONCAT('%', LOWER(?), '%')";
//         private static String SEARCH_USERS_BY_PHONE_NUMBER = "SELECT * FROM `customer_card` WHERE LOWER(phone_number) LIKE CONCAT('%', LOWER(?), '%')";
//         private static String SEARCH_USERS_BY_CITY = "SELECT * FROM `customer_card` WHERE LOWER(city) LIKE CONCAT('%', LOWER(?), '%')";
//         private static String SEARCH_USERS_BY_STREET = "SELECT * FROM `customer_card` WHERE LOWER(street) LIKE CONCAT('%', LOWER(?), '%')";
//         private static String SEARCH_USERS_BY_ZIPCODE= "SELECT * FROM `customer_card` WHERE LOWER(zipcode) LIKE CONCAT('%', LOWER(?), '%')";
//         private static String SEARCH_USERS_WHO_BOUGHT_PRODUCT= "SELECT * FROM `customer_card` WHERE card_number IN "
//                 +"(SELECT card_number FROM `check` WHERE check_number IN"
//                 +"(SELECT check_number FROM `sale` WHERE upc IN"
//                 +"(SELECT upc FROM `store_product` WHERE id_product IN"
//                 +"(SELECT id_product FROM `product` WHERE product_name=? )))";
//
//
//         private static String GET_CLIENTS_BY_PERCENT = "SELECT * FROM `customer_card` WHERE percent=? ORDER BY cust_surname";

}
exports.dao = new exports.CustomerCardDao()
