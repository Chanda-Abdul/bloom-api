require('dotenv').config()
const knex = require("knex")
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, PORT, DB_URL } = require('./config')
const bodyParser = require("body-parser")
const app = express()

const db = knex({
    client: pageXOffset,
    connection: DB_URL,
});

app.set("db, db");

app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ extended: true}))
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'

// middleware
app.use(cors())
app.use(morgan(morganSetting))
app.use(helmet())
app.use((error, req, res, next) => {
    let response
    if (process.env.NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        response = { error }
    }
    res.status(500).json(response)
})

//routers
// const plantRouter = require('./')

//services
// const plantService = require('./')


// app.use(plantRouter)

// const knexTest = db.select().table("table_name")

console.log(PORT, DB_URL)

app.get('/', (req, res) => {
    res.send('Hello, world for app.js!')
})
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
  });

module.exports = app
