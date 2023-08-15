const Validator = require('validatorjs')
const Product_reviews = require('../../model/product_review/product_review.model')

//...................add product reviews.......................
const addProductReviews = async (req, res) => {
    let validation = new Validator(req.body, {
        user_id: 'required',
        description: 'required|string|max:100',
        rating: 'required',
        product_id: 'required'
    })
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { user_id, description, rating, product_id } = req.body;

        const addData = await Product_reviews.create({
            user_id,
            description,
            rating,
            product_id
        })

        return RESPONSE.success(res, 1501, addData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }

}

//...................get all product Reviews.....................
const getAllProductReviews = async (req, res) => {
    try {
        const findData = await Product_reviews.find({ deleted_at: null })
        if (!findData) {
            return RESPONSE.error(res, 1503)
        }

        return RESPONSE.success(res, 1502, findData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//............ get one product reviews.................
const getOneProductReviews = async (req, res) => {
    try {
        const id = req.query._id;

        const findData = await Product_reviews.findOne({ _id: id, deleted_at: null })
        if (!findData) {
            return RESPONSE.error(res, 1503)
        }
        return RESPONSE.success(res, 1502, findData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//.................get product reviews with user and product
const getReviewsWithUserAndProduct = async (req, res) => {
    try {
        const productReviewsData = await Product_reviews.aggregate([

            { $match : { rating : 5 } },
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "userData",
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product_id',
                    foreignField: '_id',
                    as: "productData"
                }
            },
            {
                $project: {
                    "userData.password": 0,
                }
            },
            { $sort: { 'userData._id': 1 } },
            // { $limit: 1 },
            { $addFields: { Comment: "best products " } },
            //{$count : 'total_documents'}
            //  { $group : { _id : '$name', totaldocs : { $sum : 1 } } },
           // { $sortByCount : '$level' }

          

        ])
        return RESPONSE.success(res, 1502, productReviewsData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


const updateProductReviews = async (req, res) => {
    let validation = new Validator(req.body, {
        description: 'required|max:100',
        rating: 'required'
    })
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const id = req.query._id;
        const { description, rating } = req.body;
        const findData = await Product_reviews.findOne({ _id: id })
        if (!findData) {
            return RESPONSE.error(res, 1503)
        }

        const updateData = await Product_reviews.findByIdAndUpdate(id, { description, rating })

        return RESPONSE.success(res, 1505, updateData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//..........delete product rating .........................//
const deleteProductReviews = async (req, res) => {
    try {
        const id = req.query._id;

        const findData = await Product_reviews.findOne({ _id: id });
        if (!findData) {
            return RESPONSE.error(res, 1503)
        }

        await Product_reviews.deleteOne({ _id: findData.id })

        return RESPONSE.success(res, 1504)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}
module.exports = {
    addProductReviews,
    getAllProductReviews,
    getOneProductReviews,
    getReviewsWithUserAndProduct,
    updateProductReviews,
    deleteProductReviews
}