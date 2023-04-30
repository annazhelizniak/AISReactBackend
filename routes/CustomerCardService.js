
const {CustomerCardDao, dao} = require("../dao/customer_cardDao");

exports.CustomerCardRouter = class {

    constructor() {
    }

    getAllCards(req, res) {
        (async () => {
            res.json(await dao.getAllCards())
        })()
    }

    getCardStreet(req, res) {
        let internalDAO = dao
       // console.log(req.params.street)
        if (req.params.street) {

            (async () => {
                res.json(await internalDAO.getCardstreet(req.params.street))

            })()
        } else {
            res.send(req.params.street)
        }
    }
    getCardZip(req, res) {
        let internalDAO = dao
        if (req.params.zip_code) {
            (async () => {
                res.json(await internalDAO.getCardZip(req.params.zip_code))

            })()
        } else {
            res.sendStatus(400)
        }
    }

    getCardCity(req, res) {
        let internalDAO = dao
        if (req.params.city) {
            (async () => {
                res.json(await internalDAO.getCardCity(req.params.city))

            })()
        } else {
            res.sendStatus(400)
        }
    }
    getCardName(req, res) {
        let internalDAO = dao
        if (req.params.cust_name) {
            (async () => {
                res.json(await internalDAO.getCardName(req.params.cust_name))

            })()
        } else {
            res.sendStatus(400)
        }
    }
    getCardPhone(req, res) {
        let internalDAO = dao
        if (req.params.phone_number) {
            (async () => {
                res.json(await internalDAO.getCardPhone_number(req.params.phone_number))

            })()
        } else {
            res.sendStatus(400)
        }
    }
    getCardPatronymic(req, res) {
        let internalDAO = dao
        if (req.params.cust_patronymic) {
            (async () => {
                res.json(await internalDAO.getCardPatronymic(req.params.cust_patronymic))

            })()
        } else {
            res.sendStatus(400)
        }
    }
    getCardSurname(req, res) {
        let internalDAO = dao
        if (req.params.cust_surname) {
            (async () => {
                res.json(await internalDAO.getCardSurname(req.params.cust_surname))

            })()
        } else {
            res.sendStatus(400)
        }
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
            console.log(req.body )
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

    getCardPersent(req, res) {
        let internalDAO = dao
        if (req.params.percent) {
            (async () => {
                res.json(await internalDAO.getCardPersent(req.params.percent))

            })()
        } else {
            res.sendStatus(400)
        }
    }
    sEARCH_USERS_WHO_BOUGHT_PRODUCT(req, res) {
        let internalDAO = dao
        if (req.params.id_product) {
            (async () => {
                res.json(await internalDAO.sEARCH_USERS_WHO_BOUGHT_PRODUCT(req.params.id_product))

            })()
        } else {
            res.sendStatus(400)
        }
    }

}