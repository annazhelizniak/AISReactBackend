
const {Store_ProductDao, dao} = require("../dao/store_productDao");

exports.Store_productRouter = class {

    constructor() {
    }

    getAllStore_product(req, res) {
        (async () => {
            res.json(await dao.getAllStore_product())
        })()
    }

    getStoreProduct(req, res) {
        let internalDAO = dao
        if (req.params.upc) {
            (async () => {
                res.json(await internalDAO.getStoreProduct(req.params.upc))

            })()
        } else {
            res.sendStatus(400)
        }
    }

    addStore_product(req, res) {
        if (req.body.upc && req.body.id_product && req.body.selling_price && req.body.products_number) {
            (async () => {
                if(req.body.upc_prom) {
                    await dao.addStore_product(req.body.upc, req.body.upc_prom, req.body.id_product, req.body.selling_price, req.body.products_number, req.body.promotional_product)
                }else{
                    await dao.addStore_product1(req.body.upc, req.body.id_product, req.body.selling_price, req.body.products_number, req.body.promotional_product)
                }
                res.send("Success")
            })()
        } else {
            console.log(req.body )
        }
    }

    deleteStore_product(req, res) {
        let internalDAO = dao
        if (req.params.upc) {
            (async () => {
                await internalDAO.deleteStore_product(req.params.upc)
                res.send("Success")
            })()
        } else {
            res.sendStatus(400)
        }
    }

    updateStore_product(req, res) {
        let internalDAO = dao
        if (req.body.upc && req.body.upc_prom && req.body.id_product && req.body.selling_price && req.body.products_number) {
            (async () => {
                if (req.body.upc) {
                    await internalDAO.updateStore_product(req.body.upc, req.body.upc_prom, req.body.id_product, req.body.selling_price, req.body.products_number, req.body.promotional_product)
                }
                else{
                    await internalDAO.updateStore_product1(req.body.upc, req.body.id_product, req.body.selling_price, req.body.products_number, req.body.promotional_product)
                }
                    res.status(200).send(req.body)
            })()
        } else {
            res.sendStatus(400);   }
    }

    getAllStore_productWithProductCharacteristics(req, res) {

        (async () => {

            res.json(await dao.getAllStore_productWithProductCharacteristics())
        })()
    }


    aLL_PRODUCTS_FOR_SALE(req, res) {

        (async () => {

            res.json(await dao.aLL_PRODUCTS_FOR_SALE())
        })()
    }
    aLL_PRODUCTS_NOT_FOR_SALE(req, res) {

        (async () => {

            res.json(await dao.aLL_PRODUCTS_NOT_FOR_SALE())
        })()
    }
    aLL_PRODUCTS_FOR_SALE_SORT_BY_NUMBER(req, res) {

        (async () => {

            res.json(await dao.aLL_PRODUCTS_FOR_SALE_SORT_BY_NUMBER())
        })()
    }
    aLL_PRODUCTS_NOT_FOR_SALE_BY_NUMBER(req, res) {

        (async () => {

            res.json(await dao.aLL_PRODUCTS_NOT_FOR_SALE_BY_NUMBER())
        })()
    }
    aLL_PRODUCTS_FROM_STORE_SORTED_BY_NUMBER(req, res) {

        (async () => {

            res.json(await dao.aLL_PRODUCTS_FROM_STORE_SORTED_BY_NUMBER())
        })()
    }

}