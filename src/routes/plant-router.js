const path = require("path")
const express = require("express")
const logger = require('../logger')
const PlantService = require('../services/plant-service')
const PlantRouter = express.Router()
const jsonParser = express.json()
const knex = require("knex")

PlantRouter.router('/plants').get((req, res, next) => {
    PlantService.getAllPlants(
        req.app.get('db')
    ).then(plants => {
        res.json({ plants })
    })
    .catch(next)
})

module.exports = PlantRouter;