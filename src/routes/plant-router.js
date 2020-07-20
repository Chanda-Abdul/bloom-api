const path = require("path")
const express = require("express")
const logger = require('../logger')
const PlantService = require('../services/plant-service')
const plantRouter = express.Router()
const jsonParser = express.json()
const knex = require("knex")

plantRouter
.route('/plants')
.get((req, res, next) => {
    PlantService.getAllPlants(
        req.app.get('db')
    )
    .then(plants => {
        res.json({ plants })
    })
    .catch(next)
    })
    .post((req, res, next) => {
        const newPlant = req.body;

        PlantService.addNewPlant(
            req.app.get('db'), newPlant
        ).then(plant => {
            res
            .status(201)
            .location(path.posix
                .join(req.originalUrl, `/${plant.id}`))
            .json({ plant })
        })
        .catch(next)
    })

plantRouter
    .route('/plants/:plant_id')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db')
        const plant_id = req.params.plant_id
        PlantService.getPlantById(
            req.app.get('db'), plant_id
        ).then(plant => {
            if(!plant) {
                return res.status(404).json({
                    error: { message: `Plant does not exist`}
                })
            }
            res.plant = plant
            next()
        })
        .catch(next)
    }).get((req, res, next) => {
        res.json(res.plant)
    }).delete((req, res, next) => {
        const knexInstance = req.app.get('db')
        const plant_id = req.params.plant_id

        PlantService.deletePlant(knexInstance, plant_id)
        .then(() => {
            res.status(204).end()
        }).catch(next)
    }).patch((req, res, next) => {
        const knexInstance = req.app.get('db')
        const newPlantData = req.body;
        const plant_id = req.params.plant_id;
        const numberOfValues = Object.values(newPlantData).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: { message: 'Request body is missing information'}
            })
        }
        PlantService.updatePlant(knexInstance, plant_id, newPlantData)
        .then(() => {
            res.status(204).end()
        })
        .catch(next)
    })


module.exports = plantRouter;