const route = require('express').Router()

const review = require('../../controller/product_reviews/product_reviews.controller')

//..........add product reviews.................
route.post('/add-Product-Reviews',review.addProductReviews)

//..............get all product reviews............
route.get('/get-All-Product-Reviews',review.getAllProductReviews)

//................ getOneProductReviews....................
route.get('/get-One-Product-Reviews',review.getOneProductReviews)

//..................get productReviews with user and product.........
route.get('/getReviewsWithUserAndProduct',review.getReviewsWithUserAndProduct)

//...................update product reviews...........
route.patch('/update-Product-Reviews',review.updateProductReviews)

//.....................delete product reviews...................
route.delete('/delete-Product-Reviews',review.deleteProductReviews)

module.exports = route