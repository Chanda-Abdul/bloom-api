const dotenv = require("dotenv")
dotenv.config()

module.exports = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL,
    TEST_DB_URL: process.env.TEST_DB_URL,
    API_BASE_URL: process.env.API_BASE_URL
}