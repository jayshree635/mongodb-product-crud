const route = require('express').Router()

const user = require('../../controller/product_catgories/product-categories.controller')


//.....................add product categories...........
route.post('/add-Product-Category',user.addProductCategory)

//......................get all categories...................
route.get('/get-All-Categories',user.getAllCategories)

//.................get categories.......................
route.get('/get-Categories',user.getCategories)

//..................update categories....................
route.patch('/update-Category',user.updateCategory)

//................delete categories.......................
route.delete('/delete-Categories',user.deleteCategories)

//..................get categories with user
route.get('/get-Category-With-User',user.getCategoryWithUser)

module.exports = route