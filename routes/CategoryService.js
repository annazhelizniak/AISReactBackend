
const {CategoriesDao, dao} = require("../dao/categoryDao");

exports.CategoriesRouter = class {

    constructor() {
    }

    getCategories(req, res) {
        (async () => {
            res.json(await dao.getAllCategories())
        })()
    }


    getCategory(req, res) {
        let internalDAO = dao
        if (req.params.category_number) {
            (async () => {
                res.json(await internalDAO.getCategory(req.params.category_number))

            })()
        } else {
            res.sendStatus(400)
        }
    }

    addCategory(req, res) {
        if (req.body.category_name) {
            (async () => {
                await dao.addCategory(req.body.category_name)
                res.send(req.body)
            })()
        } else {
            console.log("err" )
        }
    }

    deleteCategory(req, res) {
        let internalDAO = dao
        if (req.params.category_number) {
            (async () => {
                await internalDAO.deleteCategory(req.params.category_number)
                res.send("Success")
            })()
        } else {
            res.sendStatus(400)
        }
    }

    updateCategory(req, res) {
        let internalDAO = dao
        if (req.body.category_number && req.body.category_name) {
            (async () => {
                await internalDAO.updateCategory(req.body.category_number, req.body.category_name)
                res.status(200).send("Success")
            })()
        } else {
            res.sendStatus(400);   }
    }

    searchByName(req, res) {
        let internalDAO = dao
        if (req.params.category_name) {
            (async () => {
                res.json(await internalDAO.searchByName(req.params.category_name))

            })()
        } else {
            res.sendStatus(400)
        }
    }

}