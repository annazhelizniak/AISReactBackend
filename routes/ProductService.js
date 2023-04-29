
const {ProductDao, dao} = require("../dao/productDao");

exports.ProductsRouter = class {

    constructor() {
    }

    getProducts(req, res) {
        console.log("a");
        (async () => {
            console.log("b");
            res.json(await dao.getProducts())
        })()
    }


    getProduct(req, res) {
        let internalDAO = dao
        if (req.params.id_product) {
            (async () => {
                res.json(await internalDAO.getProduct(req.params.id_product))

            })()
        } else {
            res.sendStatus(400)
        }
    }

    addProduct(req, res) {
        if (req.body.category_number && req.body.product_name && req.body.producer && req.body.characteristics) {
            (async () => {
                await dao.addProduct(req.body.category_number,req.body.product_name, req.body.producer, req.body.characteristics)
                res.send(req.body)
            })()
        } else {
            console.log("err" )
        }
    }

    deleteProduct(req, res) {
        let internalDAO = dao
        if (req.params.id_product) {
            (async () => {
                await internalDAO.deleteProduct(req.params.id_product)
                res.send("Success")
            })()
        } else {
            res.sendStatus(400)
        }
    }

    updateProduct(req, res) {
        let internalDAO = dao
        if (req.body.id_product && req.body.category_number && req.body.product_name && req.body.producer && req.body.characteristics) {
            (async () => {
                await internalDAO.updateProduct(req.body.id_product, req.body.category_number,req.body.product_name, req.body.producer, req.body.characteristics)
                res.status(200).send("Success")
            })()
        } else {
            res.sendStatus(400);
        }
    }


}