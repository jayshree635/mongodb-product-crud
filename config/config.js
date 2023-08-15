require('dotenv').config()

module.exports = {
    db_url : process.env.DB_URL || "mongodb://localhost:27017/aggregation",
    app_project_path : process.env.APP_PROJECT_PATH || "http://localhost:3000/",

    database : {
        host : process.env.HOST || "localhost",
        port : process.env.PORT || 3000,
        protocol : process.env.PROTOCOL || "http"
    },

    sslCertificates : {
        privkey : process.env.PRIVKEY,
        fullchain : process.env.FULLCHAIN
    },
    jwt_secret_key : process.env.JWT_SECRETE_KEY || "4D8711E2AD823E1929E94257F834B"
}