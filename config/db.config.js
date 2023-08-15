const mongoose = require('mongoose')
const db = require('./config')

const dbConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://jayshree:Ik4YRQtHaXlSBcXa@cluster0.rqnz2mh.mongodb.net/aggregation?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connect mongodb database");
    } catch (error) {
      console.log(error);
    }
}
module.exports = {
    dbConnection
}