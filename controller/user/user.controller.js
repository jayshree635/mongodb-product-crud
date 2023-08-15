const Validator = require('validatorjs')
const User = require('../../model/user/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const userSession = require('../../model/user/userSession')

//...................signup API......................
const signUp = async (req, res) => {
    let validation = new Validator(req.body, {
        userName: 'required|string|max:50',
        email: 'required|string|max:50',
        password: 'required|string|max:15|min:8',
    })
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const { userName, email, password } = req.body;
        const profile_image = req?.file?.filename;

        const ExistEmail = await User.findOne({ email: email })
        if (ExistEmail) {
            return RESPONSE.error(res, 1009)
        }

        const user = await User.create({ userName, email, password, profile_image })

        const token = jwt.sign({ email, userName, user_id: user._id }, config.jwt_secret_key, { expiresIn: '1h' });

        const session = await userSession.create({ user_id: user._id, token })
        console.log(session);

        return RESPONSE.success(res, 1001, user)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//..................get All User Profile............................
const getAllUserProfile = async (req, res) => {
    try {
        const findUser = await User.find({ deleted_At: null }, '-password')

        return RESPONSE.success(res, 1010, findUser)
    } catch (error) {
        return RESPONSE.error(res, 9999)
    }
}

//......................login User.......................
const loginUser = async (req, res) => {
    let validation = new Validator(req.body, {
        email: 'required',
        password: 'required'
    })
    if (validation.fails()) {
        firstMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(firstMessage))
    }

    try {
        const authUser = req.user
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return RESPONSE.error(res, 1007);
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return RESPONSE.error(res, 1012);
        }

        return RESPONSE.success(res, 1002, user)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//....................get user profile by id ...........................
const getUserProfile = async (req, res) => {
    try {
        const id = req.query._id;

        const findUser = await User.findOne({ _id: id, deleted_At: null }, '-password')
        return RESPONSE.success(res, 1010, findUser)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}


//....................update user profile.....................//
const updateUserProfile = async (req, res) => {
    try {
        const id = req.query._id;
        const { userName, email, current_password, new_password } = req.body;
        const profile_image = req?.file?.filename
        let object = {
            userName,
            email,
            profile_image
        }
        if (new_password) {
            let validation = new Validator({
                current_password: 'required',
                new_password: 'required|max:15|min:8'
            })
            if (validation.fails()) {
                firstMessage = Object.keys(validation.errors.all())[0];
                return RESPONSE.error(res, validation.errors.first(firstMessage))
            }
            object.password = new_password;
        }
        const data = await User.findByIdAndUpdate({ _id: id }, object)
        return RESPONSE.success(res, 1011, data);
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}

//................delete user Profile............
const deleteUser = async (req, res) => {
    try {
        const id = req.query._id;
        const findUser = await User.findOne({ _id: id })
        if (!findUser) {
            return RESPONSE.error(res, 1007)
        }

        await User.deleteOne({ _id: findUser.id })
        return RESPONSE.success(res, 1013)
    } catch (error) {
        console.log(error);
        return RESPONSE.error(res, 9999)
    }
}
module.exports = {
    signUp,
    getAllUserProfile,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUser
}