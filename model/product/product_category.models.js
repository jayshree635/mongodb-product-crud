const mongoose = require('mongoose')

//................product categories model.............
const productCategoriesSchema = mongoose.Schema({
     name : {
        type : String,
        required : true
     },
     user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
     }
})


const productCatagories = mongoose.model('product_categories',productCategoriesSchema)
module.exports = productCatagories