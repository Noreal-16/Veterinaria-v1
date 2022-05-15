require('dotenv').config();
var thinky = require('thinky')({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    db: process.env.DB_NAME
})

module.exports = thinky;