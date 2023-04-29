
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {UsersRouter} = require("./routes/EmployeeService");
const {CategoriesRouter} = require("./routes/CategoryService");
const {Store_productRouter} = require("./routes/Store_productService");
const {ProductsRouter} = require("./routes/ProductService");
const {CheckRouter} = require("./routes/CheckService");
const {CustomerCardRouter} = require("./routes/CustomerCardService");
const {SaleRouter} = require("./routes/SaleService");
exports.runProgram = function (port) {

    const app = express();
    const usersRouter = new UsersRouter()
    const categoriesRouter = new CategoriesRouter()
    const store_productRouter = new Store_productRouter()
    const productRouter = new ProductsRouter();
    const checkRouter = new CheckRouter();
    const cardRouter = new CustomerCardRouter();
    const saleRouter = new SaleRouter();
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
//
    app.get('/aLL_PRODUCTS_FOR_SALE', store_productRouter.aLL_PRODUCTS_FOR_SALE)
    app.get('/aLL_PRODUCTS_NOT_FOR_SALE', store_productRouter.aLL_PRODUCTS_NOT_FOR_SALE)
    app.get('/aLL_PRODUCTS_FOR_SALE_SORT_BY_NUMBER', store_productRouter.aLL_PRODUCTS_FOR_SALE_SORT_BY_NUMBER)
    app.get('/aLL_PRODUCTS_NOT_FOR_SALE_BY_NUMBER', store_productRouter.aLL_PRODUCTS_NOT_FOR_SALE_BY_NUMBER)
    app.get('/aLL_PRODUCTS_FROM_STORE_SORTED_BY_NUMBER', store_productRouter.aLL_PRODUCTS_FROM_STORE_SORTED_BY_NUMBER)
//


    //products
    app.get('/products', productRouter.getProducts)
    app.get('/products/:id_product', productRouter.getProduct)
    app.post('/products', productRouter.addProduct)
    app.put('/products', productRouter.updateProduct)
    app.delete('/products/:id_product', productRouter.deleteProduct)


    //checks
    app.get('/checks', checkRouter.getAllChecks)
    app.get('/checks/:check_number', checkRouter.getCheck)
    app.post('/checks', checkRouter.addCheck)
    app.put('/checks', checkRouter.updateCheck)
    app.delete('/checks/:check_number', checkRouter.deleteCheck)

    //customer card
    app.get('/cards', cardRouter.getAllCards)
    app.get('/cards/:card_number', cardRouter.getCard)
    app.post('/cards', cardRouter.addCard)
    app.put('/cards', cardRouter.updateCard)
    app.delete('/cards/:card_number', cardRouter.deleteCard)

    //sales
    app.get('/sales', saleRouter.getAllSales)
    app.post('/salesid', saleRouter.getSale)
    app.post('/sales', saleRouter.addSale)
    app.put('/sales', saleRouter.updateSale)
    app.delete('/sales', saleRouter.deleteSale)

    app.listen(port, () => {
        console.log("Server is listening on port " + port)
    });

}