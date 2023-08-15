const Validator = require('validatorjs')
const Product_categories = require('../../model/product-category/product_category.models')

const addProductCategory = async (req, res) => {
    let validation = new Validator(req.body, {
        name: 'required|string|max:50',
        user_id: 'required'
    })
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }
    try {
        const { name, user_id } = req.body;

        const productCategory = await Product_categories.create({ name, user_id })

        return RESPONSE.success(res, 1101, productCategory)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


const getAllCategories = async (req, res) => {
    try {
        const Category = await Product_categories.find({ deleted_At: null })

        return RESPONSE.success(res, 1102, Category)
    } catch (error) {
        return RESPONSE.error(res, 9999)
    }
}

const getCategories = async (req, res) => {
    try {
        const id = req.query._id
        const Category = await Product_categories.findOne({ _id: id, deleted_At: null })

        return RESPONSE.success(res, 1102, Category)
    } catch (error) {
        return RESPONSE.error(res, 9999)
    }
}

const updateCategory = async (req, res) => {
    let validation = new Validator(req.body, {
        name: 'required|string',
    })
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }
    try {
        const id = req.query._id
        const {name} = req.body
        const findCategory = await Product_categories.findOne({_id : id})

        if (!findCategory) {
            return RESPONSE.error(res,1104)
        }

        const updateData = await Product_categories.findByIdAndUpdate(id, {name})
        return RESPONSE.success(res,1105,updateData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res,9999)
    }
}

//................delete product_categories ...............
const deleteCategories = async (req,res) => {
    try {
        const id = req.query._id;

        const findCategory = await Product_categories.findOne({_id : id})

        if (!findCategory) {
            return RESPONSE.error(res,1104)
        }

        await Product_categories.deleteOne({_id : findCategory.id})
        return RESPONSE.success(res,1103)

    } catch (error) {
        console.log(error);
        return RESPONSE.error(res,9999)
    }
}


const getCategoryWithUser = async (req, res) => {
    try {
        //const id = req.query._id;

        const CategoriesData = await Product_categories.aggregate([
            {

                $lookup: {
                    from: "users",
                    localField : "user_id",
                    foreignField : "_id",
                    as : "userData"
                }
            }

        ]);
        return RESPONSE.success(res, 1302, CategoriesData);
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999);
    }
};
module.exports = {
    addProductCategory,
    getAllCategories,
    getCategories,
    updateCategory,
    deleteCategories,
    getCategoryWithUser
}