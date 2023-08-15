const mongoose = require('mongoose')

const userSessionSchema = mongoose.Schema ({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    token : {
        type : String
    }
},{
    timestamps : true
})


const userSession = mongoose.model('userSessions',userSessionSchema)
module.exports = userSession