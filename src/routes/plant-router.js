const path = require("path")
const express = require("express")
const logger = require('../logger')
const PlantService = require('../services/plant-service')
const plantRouter = express.Router()
const jsonParser = express.json()
const knex = require("knex")

plantRouter.route('/plants').get((req, res, next) => {
    PlantService.getPlants(
        req.app.get('db')
    ).then(plants => {
        res.json({ plants })
    })
    .catch(next)
})

module.exports = plantRouter;