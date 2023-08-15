const mongoose = require('mongoose')

//.......................product_review model.........................//

const productReviewSchema = mongoose.Schema({
    user_id : {
           type : mongoose.Schema.Types.ObjectId,
           ref : 'users'
    },
    description : {
         type : String,
         required : true,
         maxlenght : 100
    },
    rating : {
         type : Number,
         enum : [1,2,3,4,5]
    },
    product_id : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'products'
    }

})

const product_review = mongoose.model('product_reviews',productReviewSchema)
module.exports = product_review