
const {EmployeeDao, dao} = require("../dao/employeeDao");

exports.UsersRouter = class {

    constructor() {
    }

    getUsers(req, res) {
            (async () => {
                res.json(await dao.getAllUsers())
            })()
    }

    gET_ALL_KASIRS(req, res) {
        (async () => {
            res.json(await dao.gET_ALL_KASIRS())
        })()
    }

    fIND_PHONE_ADD_BY_SURNAME(req, res) {
        if (req.body.empl_surname) {
            (async () => {
                res.json(await dao.fIND_PHONE_ADD_BY_SURNAME(empl_surname))
            })()
        } else {
            res.sendStatus(400)
        }
    }
    addUser(req, res) {
            (async () => {
                await dao.addUser(req.body.empl_surname,
                            req.body.empl_name,req.body.empl_patronymic,
                            req.body.empl_role,req.body.salary,
                            req.body.date_of_birth,req.body.date_of_start,
                            req.body.phone_number,req.body.city,
                            req.body.street, req.body.zip_code,
                            req.body.email,req.body.password)
                res.send("Success")
            })()
        // (async () => {
        //     await dao.addUser(req.params.id_employee,req.params.empl_surname,
        //         req.params.empl_name,req.params.empl_patronymic,
        //         req.params.empl_role,req.params.salary,
        //         req.params.date_of_birth,req.params.date_of_start,
        //         req.params.phone_number,req.params.city,
        //         req.params.street, req.params.zip_code,
        //         req.params.email,req.params.password)
        //     res.send(req.params)
        //
        // })()
    }


    getUser(req, res) {
        let internalDAO = dao
        if (req.params.id_employee) {
            (async () => {
                res.json(await internalDAO.getUser(req.params.id_employee))

            })()
        } else {
            res.sendStatus(400)
        }
    }
    deleteUser(req, res) {
        let internalDAO = dao
        if (req.params.id_employee) {
            (async () => {
                await internalDAO.deleteUser(req.params.id_employee)
                res.send("Success")
            })()
        } else {
            res.sendStatus(400)
        }
    }

    updateUser(req, res) {
        let internalDAO = dao
        console.log(req.body)
        if (req.body.id_employee && req.body.empl_surname && req.body.empl_name && req.body.empl_patronymic && req.body.empl_role && req.body.salary && req.body.date_of_birth && req.body.date_of_start && req.body.phone_number && req.body.city && req.body.street && req.body.zip_code && req.body.email && req.body.password) {
            (async () => {
                await internalDAO.updateUser(req.body.id_employee,req.body.empl_surname,req.body.empl_name,req.body.empl_patronymic,req.body.empl_role,req.body.salary,req.body.date_of_birth,req.body.date_of_start,req.body.phone_number,req.body.city,req.body.street,req.body.zip_code, req.body.email,req.body.password)
                res.send("Success")
            })()
        } else {
            res.sendStatus(400);   }
    }

    credentialsAreValid(req, res) {
        if (req.body.email && req.body.password) {
            (async () => {
                res.send(await dao.credentialsAreValid(req.body.email, req.body.password))
            })()
        } else if (req.query.login && req.query.password) {
            (async () => {
                res.send(await dao.credentialsAreValid(req.query.email, req.query.password))

            })()
        } else {
            res.sendStatus(400)
        }
    }


}