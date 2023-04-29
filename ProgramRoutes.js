
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {UsersRouter} = require("./routes/EmployeeService");
const {CategoriesRouter} = require("./routes/CategoryService");
const {Store_productRouter} = require("./routes/Store_productService");
const {ProductsRouter} = require("./routes/ProductService");
exports.runProgram = function (port) {

    const app = express();
    const usersRouter = new UsersRouter()
    const categoriesRouter = new CategoriesRouter()
    const store_productRouter = new Store_productRouter()
    const productRouter = new ProductsRouter();
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(cors())

    //employees
    app.get('/users', usersRouter.getUsers)
    app.get('/users/:id_employee', usersRouter.getUser)
    app.post('/users',usersRouter.addUser)
    app.put('/users', usersRouter.updateUser)
    app.delete('/users/:id_employee', usersRouter.deleteUser)
    app.post('/checkuser', usersRouter.credentialsAreValid)
    app.get('/allkasirs', usersRouter.gET_ALL_KASIRS)

    //app.post('/findphoneaddbysurname', usersRouter.gET_ALL_KASIRS)



    //categories
    app.get('/categories', categoriesRouter.getCategories)
    app.get('/categories/:category_number', categoriesRouter.getCategory)
    app.post('/categories', categoriesRouter.addCategory)
    app.put('/categories', categoriesRouter.updateCategory)
    app.delete('/categories/:category_number', categoriesRouter.deleteCategory)
    app.get('/categories/searchbyname/:category_name', categoriesRouter.searchByName)



    //store_products
    app.get('/store_products', store_productRouter.getAllStore_product)
    app.get('/store_products/:upc', store_productRouter.getStoreProduct)
    app.post('/store_products', store_productRouter.addStore_product)
    app.put('/store_products', store_productRouter.updateStore_product)
    app.delete('/store_products/:upc', store_productRouter.deleteStore_product)
    app.get('/getAllStore_productWithProductCharacteristics', store_productRouter.getAllStore_productWithProductCharacteristics)


    //products
    app.get('/products', productRouter.getProducts)
    app.get('/products/:upc', productRouter.getProduct)
    app.post('/products', productRouter.addProduct)
    app.put('/products/:upc', productRouter.updateProduct)
    app.delete('/products/:upc', productRouter.deleteProduct)


    app.listen(port, () => {
        console.log("Server is listening on port " + port)
    });

}