const moment = require('moment')
const db = require('../config/db.config')
const Admin = require('../model/admin/admin')
const AdminSession = require('../model/admin/adminSession')
const User = require('../model/user/user.model')
const UserSession = require('../model/user/userSession.model')

//....................Admin auth............................//
const authAdmin = async (req, res, next) => {
  const headerToken = req.headers.authorization ? req.headers.authorization : null;

  try {
    const isAuth = await AdminSession.findOne({ token: headerToken });

    if (!isAuth || !isAuth.admin_id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized Admin',
      });
    }

    if (isAuth.expire_timestamp < moment().unix()) {
      await AdminSession.deleteOne({ token: headerToken });
      return res.status(401).json({
        success: false,
        message: 'Session expired',
      });
    }

    await AdminSession.updateOne({ expire_timestamp: moment().unix() }, { token: headerToken });
    const admin = await Admin.findOne({ _id: isAuth.admin_id }, '_id');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'admin not found',
      });
    }

    const adminJson = admin.toJSON();
    adminJson.role = 'admin';
    req.user = adminJson;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};


//.........................User auth...............................//
const authUser = async (req, res, next) => {
  const headerToken = req.headers.authorization ? req.headers.authorization : null;

  try {
    const isAuth = await UserSession.findOne({ token: headerToken });

    if (!isAuth || !isAuth.user_id) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized User',
      });
    }

    if (isAuth.expire_timestamp < moment().unix()) {
      await UserSession.deleteOne({ token: headerToken });
      return res.status(401).json({
        success: false,
        message: 'Session expired',
      });
    }

    await UserSession.updateOne({ expire_timestamp: moment().unix() }, { token: headerToken });
    const user = await User.findOne({ _id: isAuth.user_id }, '_id');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    const userJson = user.toJSON();
    userJson.role = 'user';
    req.user = userJson;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  authAdmin,
  authUser
}