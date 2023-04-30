
const {SaleDao, dao} = require("../dao/saleDao");

exports.SaleRouter = class {

    constructor() {
    }

    getAllSales(req, res) {
        (async () => {
            res.json(await dao.getAllSales())
        })()
    }


    getSale(req, res) {
        let internalDAO = dao
        if (req.body.upc && req.body.check_number) {
            (async () => {
                res.json(await internalDAO.getSale(req.body.upc, req.body.check_number))

            })()
        } else {
            res.sendStatus(400)
        }
    }

    addSale(req, res) {
        if (req.body.upc && req.body.check_number && req.body.product_number && req.body.selling_price) {
            (async () => {
                await dao.addSale(req.body.upc,req.body.check_number,req.body.product_number,req.body.selling_price)
                res.send(req.body)
            })()
        } else {
            console.log(req.body)
        }
    }

    deleteSale(req, res) {
        let internalDAO = dao;
        if (req.body.upc && req.body.check_number) {
            (async () => {
                await internalDAO.deleteSale({upc: req.body.upc, check_number: req.body.check_number});
                res.send("Success");
            })();
        } else {
            res.send(req.params);
        }
    }

    updateSale(req, res) {
        let internalDAO = dao
        if (req.body.upc && req.body.check_number && req.body.product_number && req.body.selling_price) {
            (async () => {
                await internalDAO.updateSale(req.body.upc,req.body.check_number,req.body.product_number,req.body.selling_price)
                res.status(200).send("Success")
            })()
        } else {
            res.sendStatus(400);
        }
    }


}