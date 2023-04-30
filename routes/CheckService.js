
const {CheckDao, dao} = require("../dao/checkDao");

exports.CheckRouter = class {

    constructor() {
    }

    getAllChecks(req, res) {
        (async () => {
            res.json(await dao.getAllChecks())
        })()
    }

    getCheck(req, res) {
        let internalDAO = dao
        if (req.params.check_number) {
            (async () => {
                res.json(await internalDAO.getCheck(req.params.check_number))

            })()
        } else {
            res.sendStatus(400)
        }
    }

    addCheck(req, res) {
        if (req.body.check_number && req.body.id_employee && req.body.print_date && req.body.sum_total && req.body.vat) {
            (async () => {
                if(req.body.card_number) {
                    await dao.addCheck(req.body.check_number, req.body.card_number, req.body.id_employee, req.body.print_date, req.body.sum_total, req.body.vat)
                }else{
                    await dao.addCheck1(req.body.check_number, req.body.id_employee, req.body.print_date, req.body.sum_total, req.body.vat)
                }
                res.send("Success")
            })()
        } else {
            console.log(req.body )
        }
    }

    deleteCheck(req, res) {
        let internalDAO = dao
        if (req.params.check_number) {
            (async () => {
                await internalDAO.deleteCheck(req.params.check_number)
                res.send("Success")
            })()
        } else {
            res.sendStatus(400)
        }
    }

    updateCheck(req, res) {
        let internalDAO = dao
        if (req.body.check_number && req.body.id_employee && req.body.print_date && req.body.sum_total && req.body.vat) {
            (async () => {
                if (req.body.card_number) {
                    await internalDAO.updateCheck(req.body.check_number, req.body.card_number, req.body.id_employee, req.body.print_date, req.body.sum_total, req.body.vat)
                }
                else{
                    await internalDAO.updateCheck1(req.body.check_number, req.body.id_employee, req.body.print_date, req.body.sum_total, req.body.vat)
                }
                res.status(200).send(req.body)
            })()
        } else {
            res.sendStatus(400);   }
    }

    getMaxCheck(req,res){
        (async () => {
            res.json(await dao.getMaxCheck())
        })()
    }

    getProductsFromXCheck(req, res) {
        let internalDAO = dao
        if (req.params.check_number) {
            (async () => {
                res.json(await internalDAO.getProductsFromXCheck(req.params.check_number))

            })()
        } else {
            res.sendStatus(400)
        }
    }

    getAllChecksByCashierForPeriod(req, res) {
        if (req.body.id_employee && req.body.print_date_start && req.body.print_date_end) {
            (async () => {
                res.json(await dao.getAllChecksByCashierForPeriod(req.body.id_employee,req.body.print_date_start,req.body.print_date_end))
                console.log(req.body )
            })()
        } else {
            console.log(req.body )
        }
    }

    getAllChecksByAllCashiersForPeriod(req, res) {
        if (req.body.print_date_start && req.body.print_date_end) {
            (async () => {
                res.json(await dao.getAllChecksByAllCashiersForPeriod(req.body.print_date_start,req.body.print_date_end))
                console.log(req.body )
            })()
        } else {
            console.log(req.body )
        }
    }

    getSumChecksByCashierForPeriod(req, res) {
        if (req.body.id_employee && req.body.print_date_start && req.body.print_date_end) {
            (async () => {
                res.json(await dao.getSumChecksByCashierForPeriod(req.body.id_employee,req.body.print_date_start,req.body.print_date_end))
                console.log(req.body )
            })()
        } else {
            console.log(req.body )
        }
    }

    getSumChecksByAllCashiersForPeriod(req, res) {
        if (req.body.print_date_start && req.body.print_date_end) {
            (async () => {
                res.json(await dao.getSumChecksByAllCashiersForPeriod(req.body.print_date_start,req.body.print_date_end))
                console.log(req.body )
            })()
        } else {
            console.log(req.body )
        }
    }

    getAmountOfProductSailedForPeriod(req, res) {
        if (req.body.id_product && req.body.date_start && req.body.date_end) {
            (async () => {
                res.json(await dao.getAmountOfProductSailedForPeriod(req.body.id_product,req.body.date_start,req.body.date_end))
                console.log(req.body )
            })()
        } else {
            console.log(req.body )
        }
    }

}