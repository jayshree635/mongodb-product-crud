const mongoose = require('mongoose')

//..................product model................
const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image : {
        type : String,
        get : image => ASSETS.getProfileURL('productimages',image)
    },
    product_categories_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product_categories'
    }

},{
    timestamps : {create_At : 'created_at',updated_At : 'updated_at'},
    toJSON: {
        getters: true,
        setters: true
    },
    toObject: {
        getters: true,
        setters: true
    }

})

const product = mongoose.model('products',productSchema)
module.exports = product