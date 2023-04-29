
const {CustomerCardDao, dao} = require("../dao/customer_cardDao");

exports.CustomerCardRouter = class {

    constructor() {
    }

    getAllCards(req, res) {
        (async () => {
            res.json(await dao.getAllCards())
        })()
    }


    getCard(req, res) {
        let internalDAO = dao
        if (req.params.card_number) {
            (async () => {
                res.json(await internalDAO.getCard(req.params.card_number))

            })()
        } else {
            res.sendStatus(400)
        }
    }

    addCard(req, res) {
        if (req.body.cust_surname && req.body.cust_name && req.body.phone_number && req.body.percent) {
            (async () => {
                await dao.addCard(req.body.cust_surname,req.body.cust_name,req.body.cust_patronymic,req.body.phone_number,req.body.city,req.body.street,req.body.zip_code,req.body.percent)
                res.send(req.body)
            })()
        } else {
            console.log("err" )
        }
    }

    deleteCard(req, res) {
        let internalDAO = dao
        if (req.params.card_number) {
            (async () => {
                await internalDAO.deleteCard(req.params.card_number)
                res.send("Success")
            })()
        } else {
            res.send(req.params)
        }
    }

    updateCard(req, res) {
        let internalDAO = dao
        if (req.body.card_number && req.body.cust_surname && req.body.cust_name && req.body.phone_number && req.body.percent) {
            (async () => {
                await internalDAO.updateCard(req.body.card_number,req.body.cust_surname,req.body.cust_name,req.body.cust_patronymic,req.body.phone_number,req.body.city,req.body.street,req.body.zip_code,req.body.percent)
                res.status(200).send("Success")
            })()
        } else {
            res.sendStatus(400);
        }
    }


}