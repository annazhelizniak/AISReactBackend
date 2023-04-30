
const {AdditionalFunctionsDao, dao} = require("../dao/additionalfunctionsDao");

exports.AdditionalFunctionsRouter = class {

    constructor() {
    }

    getupcForAllWorkers(req, res) {
        (async () => {
            res.json(await dao.getupcForAllWorkers())
        })()
    }


    getProductsInCategoryinDifferentPrice(req, res) {
        let internalDAO = dao
        if (req.params.category_number) {
            (async () => {
                res.json(await internalDAO.getProductsInCategoryinDifferentPrice(req.params.category_number))

            })()
        } else {
            res.sendStatus(400)
        }
    }

    getupcForAllCustomers(req, res) {
        (async () => {
            res.json(await dao.getupcForAllCustomers())
        })()
    }


    getProductsInCategoryinDifferentNumber(req, res) {
        let internalDAO = dao
        if (req.params.category_number) {
            (async () => {
                res.json(await internalDAO.getProductsInCategoryinDifferentNumber(req.params.category_number))

            })()
        } else {
            res.sendStatus(400)
        }
    }

    getupcForAllCategories(req, res) {
        (async () => {
            res.json(await dao.getupcForAllCategories())
        })()
    }


    getCategoryinDifferentProductsserteinProducer(req, res) {
        let internalDAO = dao
        if (req.params.producer) {
            (async () => {
                res.json(await internalDAO.getCategoryinDifferentProductsserteinProducer(req.params.producer))

            })()
        } else {
            res.sendStatus(400)
        }
    }

}