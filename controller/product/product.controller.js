const Validator = require('validatorjs')
const Product = require('../../model/product/product.model')


const createProduct = async (req, res) => {
    let validation = new Validator(req.body, {
        title: 'required|string|max:30',
        description: 'required|string|max:100',
        product_categories_id: 'required'
    })
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }
    try {
        const { title, description, product_categories_id } = req.body;
        const image = req?.file?.filename;

        const createData = await Product.create({ title, description, product_categories_id, image })

        return RESPONSE.success(res, 1301, createData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


const getProductCategoriesWithUser = async (req, res) => {
    try {
        //const id = req.query._id;

        const productData = await Product.aggregate([
            {

                $lookup: {
                    from: "product_categories",
                    localField: "product_categories_id",
                    foreignField: "_id",
                    as: "categoriesData"
                }
            }

        ]);
        return RESPONSE.success(res, 1302, productData);
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999);
    }
};

//...................get all product................
const getAllProduct = async (req, res) => {
    try {
        const productData = await Product.find({ deleted_At: null })

        return RESPONSE.success(res, 1102, productData)
    } catch (error) {
        return RESPONSE.error(res, 9999)
    }
}

//...............get product by id................
const getProduct = async (req, res) => {
    try {
        const id = req.query._id
        const productData = await Product.findOne({ _id: id, deleted_At: null })

        return RESPONSE.success(res, 1102, productData)
    } catch (error) {
        return RESPONSE.error(res, 9999)
    }
}

const updateProduct = async(req,res) => {
    let validation = new Validator(req.body,{
        title : 'required|string',
        description : 'required|string',
        product_categories_id : 'required'

    })
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }
    try {
        const {title,description,product_categories_id} = req.body;
        const image = req?.file?.filename;

        const id = req.query._id
        const findProduct = await Product.findOne({_id : id})
        if (!findProduct) {
            return RESPONSE.error(res,1307)
        }

        const updateData = await Product.findByIdAndUpdate(id, {title,description,product_categories_id,image})
        return RESPONSE.success(res,1105,updateData)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res,9999)
    }
}


//..................delete Product.................
const deleteProduct = async(req,res) => {
    try {
        const id = req.query._id;

        const findProduct = await Product.findOne({_id : id})
        if (!findProduct) {
            return RESPONSE.error(res,1307)
        }

   await Product.deleteOne({_id : findProduct.id})
        return RESPONSE.success(res,1304)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res,9999)
    }
}
module.exports = {
    createProduct,
    getProductCategoriesWithUser,
    getAllProduct,
    getProduct,
    updateProduct,
    deleteProduct
}