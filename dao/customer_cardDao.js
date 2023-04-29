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
                `DELETE FROM ${db.CUSTOMER_CARD_DB} WHERE card_number= ${id}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }



}
exports.dao = new exports.CustomerCardDao()
