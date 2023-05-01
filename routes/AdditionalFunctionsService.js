
const {AdditionalFunctionsDao, dao} = require("../dao/additionalfunctionsDao");

exports.AdditionalFunctionsRouter = class {

    constructor() {
    }

    getupcForAllChecks(req, res) {
        (async () => {
            res.json(await dao.getupcForAllChecks())
        })()
    }


    countAmountofProductsForCertainCategory(req, res) {
        let internalDAO = dao
        if (req.params.category_name) {
            (async () => {
                res.json(await internalDAO.countAmountofProductsForCertainCategory(req.params.category_name))

            })()
        } else {
            res.sendStatus(400)
        }
    }

    getCustomersFromAllKasirs(req, res) {
        (async () => {
            res.json(await dao.getCustomersFromAllKasirs())
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

    getkasirsForAllClients(req, res) {
        (async () => {
            res.json(await dao.getkasirsForAllClients())
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