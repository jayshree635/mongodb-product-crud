const route = require('express').Router()

const user = require('../../controller/user/user.controller')
const upload= require('../../middelware/uploadfile')

//..............signup...........
route.post('/signUp',upload.uploadImage('profileimages','profile_image'),user.signUp)

//.............get all user profile.......
route.get('/get-All-User-Profile',user.getAllUserProfile)

//.................get user profile..........
route.get('/get-User-Profile',user.getUserProfile)

//.................login user............
route.post('/login-User',user.loginUser)

//..............update user profile..........
route.patch('/update-User-Profile',upload.uploadImage('profileimages',"profile_image"),user.updateUserProfile)

//..................delete user.....................
route.delete('/delete-User',user.deleteUser)

module.exports = route