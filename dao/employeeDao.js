const db = require("./dbProperties")

exports.EmployeeDAO = class {
    constructor() {
    }

    // #guardCredentials(login, passwd) {
    //     db.stringGuard(login)
    //     db.stringGuard(passwd)
    // }


    // private static String GET_BY_ID = "SELECT * FROM `employee` WHERE id_employee=?";
    // private static String CREATE = "INSERT INTO `employee`"
    //     + " (empl_surname, empl_name, empl_patronymic, empl_role, salary, date_of_birth, date_of_start, phone_number, city, street, zip_code) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?)";
    // private static String UPDATE = "UPDATE `employee`"
    //     + " SET empl_surname=?, empl_name=? , empl_patronymic=?, empl_role=?, salary=?, date_of_birth=?, date_of_start=?, phone_number=?, city=?, street=?, zip_code=?" + " WHERE id_employee=? ";
    // private static String DELETE = "DELETE FROM `employee` WHERE id_employee=?";
    // private static String GET_ALL_KASIRS = "SELECT * FROM `employee` WHERE empl_role='kasir' ORDER BY empl_surname";
    // private static String FIND_PHONE_ADD_BY_SURNAME = "SELECT phone_number, city, street, zipcode FROM `employee` WHERE empl_surname=?";
    // private static String GET_BY_EMAIL_LOGIN = "SELECT * FROM `employee` WHERE email=? AND password=?";

    gET_ALL_KASIRS() {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.EMPLOYEE_DB} WHERE empl_role="kasir" ORDER BY empl_surname`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    resolve(results)
                }
            )
        })
    }

    fIND_PHONE_ADD_BY_SURNAME(empl_surname){
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT phone_number, city, street, zipcode FROM ${db.EMPLOYEE_DB} WHERE empl_surname=${empl_surname}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    resolve(results)
                }
            )
        })
    }

    getAllUsers() {
        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.EMPLOYEE_DB} ORDER BY empl_surname`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    resolve(results)
                }
            )
        })
    }


    credentialsAreValid(login, passwd) {
        // this.#guardCredentials(login, passwd)

        return new Promise(function (resolve) {
            db.connection.query(
                `SELECT * FROM ${db.EMPLOYEE_DB} WHERE email = '${login}' AND password = '${passwd}'`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(false)
                    }
                    resolve(results.length > 0)
                }
            )
        })
    }


    addUser(id_employee,empl_surname,
            empl_name,empl_patronymic,
            empl_role,salary,
            date_of_birth,date_of_start
            ,phone_number,city,
            street,zip_code,
            email,password) {

     //   this.#guardCredentials(login, passwd)

        return new Promise(function (resolve) {
            db.connection.query(
                `INSERT INTO ${db.EMPLOYEE_DB} (id_employee,empl_surname,empl_name,empl_patronymic,empl_role,salary,date_of_birth,date_of_start,phone_number,city,street,zip_code,email,password) VALUES ('${id_employee}','${empl_surname}','${empl_name}','${empl_patronymic}','${empl_role}','${salary}','${date_of_birth}','${date_of_start}','${phone_number}','${city}','${street}','${zip_code}','${email}','${password}')`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(err)
                    }
                    resolve(results)
                }
            )
        })
    }

    updateUser(id_employee,empl_surname,empl_name,empl_patronymic,empl_role,salary,date_of_birth,date_of_start,phone_number,city,street,zip_code,email,password) {
        return new Promise(function (resolve) {
            db.connection.query(
                `
                    UPDATE ${db.EMPLOYEE_DB} 
                    SET
                        empl_surname = '${empl_surname}'
                        empl_name = '${empl_name}'
                        empl_patronymic = '${empl_patronymic}'
                        empl_role = '${empl_role}'
                        salary = '${salary}'
                        date_of_birth = '${date_of_birth}'
                        date_of_start = '${date_of_start}'
                        phone_number = '${phone_number}'
                        city = '${city}'
                        street = '${street}'
                        zip_code = '${zip_code}'
                        email = '${email}'
                        password = '${password}'
                    WHERE id = ${id_employee}
                `,
                (err, results) => {
                    if (err) {
                        console.log(err)
                        resolve(err)
                    }
                    resolve(results)
                }
            )
        })
    }


    deleteUser(id) {
       // db.integerGuard(id)

        return new Promise(function (resolve) {
            db.connection.query(
                `DELETE FROM ${db.EMPLOYEE_DB} WHERE id_employee= ${id}`,
                (err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve(results)
                })
        })
    }

    getUser(id_employee) {

        return new Promise(function (resolve) {

            db.connection.query(`SELECT * FROM ${db.EMPLOYEE_DB} WHERE id_employee = ${id_employee}`,
                (err, results) => {
                if (err) {
                    console.log(err)
                }
                resolve(results)
            })
        })
     }

}

exports.dao = new exports.EmployeeDAO()
