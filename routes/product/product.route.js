const route = require('express').Router()

const product = require('../../controller/product/product.controller');
const upload = require('../../middelware/uploadfile')

//..............create product..................
route.post('/create-Product',upload.uploadImage('productimages','image'),product.createProduct)

//...................get product categories with user.....................
route.get('/get-ProductCategories-With-User',product.getProductCategoriesWithUser)

//........................get all product.........................
route.get('/get-All-Product',product.getAllProduct)

//.....................get product...................
route.get('/get-Product',product.getProduct)

//................update product ..........................
route.patch('/update-Product',upload.uploadImage('productimages','image'),product.updateProduct)

//......................delete product..........................
route.delete('/delete-Product',product.deleteProduct)

module.exports = route