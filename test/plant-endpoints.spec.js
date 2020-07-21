const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { TEST_DB_URL } = require('../src/config')
const supertest = require('supertest')
const { makePlantArray } = require('./plant.fixtures')


console.log(TEST_DB_URL, "test db");

describe("Plants endpoints", function () {
    let db = knex({
        client: "pg",
        connection: TEST_DB_URL,
    });

    const request = supertest(app)

    before('populate the table', (done) => {
        makePlantArray().forEach(async (plant) => {
            await db.into("plant_information").insert(plant)
        })
        done();
    });

    after('clean the table', () => db('plant_information').truncate())
    
    describe(`GET /plants`, () => {
        it(`responds with 200`, (done) => {
            request
            .get('/plants')
            .expect(200, done)
        });

        it(`responds with 200 and returns and array of 3 plants`, (done) => {
            request
            .get('/plants')
            .expect(200, done)
            .expect('Content-Type', /json/)
            .then((res) => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(3)
            });
            done()
        });
    })

    describe(`GET /plants/:plant_id`, () => {
        it(`should respond with 404 if plants are missing`, (done) => {
            const plantId = 123456;
            request
            .get(`/plants/${plantId}`)
            .expect(404, { message: `Plants do not exist` });
            done()
        });
        it(`should respond with 200 and the specified plant`, (done) => {
            const testPlants = makePlantArray;
            console.log(makePlantArray[1], "test plants");
            const plantId = 2;
            const expectPlants = testPlants[plantId - 1];
            request.get(`/plants/${plantId}`).expect(200, expectPlants);
            done()
        })
        
    });


describe.only(`POST /plants endpoint`, () => {
    it(`creates a plant, responding with 201 and the new plant`, (done) => {
        const newPlant = {
            "plant_name": "Plant 2",
            "scientific_name": "something scientific",
            "plant_type": "Leafy",
            "details": "insert interesting details here",
             "maintenance_level": 1,
             "water_requirements": 1,
             "light_conditions": 1,
             "image_url": "hhttps://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        };
        request
        .post('/plants')
        .send(newPlant)
        .expect(201)
        .expect((res) => {
            expect(res.body.plant_name).to.eql(newPlant.plant_name);
            expect(res.body.scientific_name).to.eql(newPlant.scientific_name);
            expect(res.body.plant_type).to.eql(newPlant.plant_type);
            expect(res.body.details).to.eql(newPlant.details);
            expect(res.body.maintenance_level).to.eql(newPlant.maintenance_level);
            expect(res.body.water_requirements).to.eql(newPlant.water_requirements);
            expect(res.body.light_conditions).to.eql(newPlant.light_conditions);
            expect(res.body.image_url).to.eql(newPlant.image_url);
            expect(res.body).to.have.property('plant_id');
            expect(res.headers.location).to
            .eql(`/plants/${res.body.plant_id}`);
        })
        .then((postRes) => {
            supertest(app)
            .get(`/plants/${postRes.body.plant_id}`)
            .expect(postRes.body)
        })
        const requiredFields = ["plant_name", "scientific_name"];

        requiredFields.forEach((field) => {
            const newPlant = {
                plant_name: "test plant",
                scientific_name: "testing scientific",
            };
            it(`responds with 400 and an error message with the '${field}' is missing`, () => {
                delete newPlant[field];

                request
                .post('/plants')
                .send(newPlant)
                .expect(400, {
                    error: { 
                        message: `Missing '${field}' in request body` },
                });
            });
        });
        done()
    });
});

describe.only(`DELETE /plants/:plant_id`, () => {
    context(`Given no plants`, () => {
        it(`responds with 404`, (done) => {
            const plantId = 123456;
            request
            .delete(`/plants/${plantId}`)
            .expect(404, { 
                error: { 
                    message: `Plant does not exist` } 
                });
                done()
        });
    });

    context('Given there are plants in the database', () => {
        const testPlants = makePlantArray();

        before('insert plant', () => {
            return db.into('plant_information').insert(testPlants);
        });

        it('responds with 404 and removes the plant', (done) => {
            const idToRemove = 2;
            const expectedPlants = testPlants.filter(
                (plant) => plant.plant_id !== idToRemove
            );
            request
            .delete(`/plants/${idToRemove}`)
            .expect(404)
            .then((res) => 
            supertest(app)
            .get(`/plants`)
            .expect(expectedPlants)
            );
            done()
        });
    });
});

describe.only(`PATCH /plants/:plant_id`, () => {
    context(`Given no plants`, () => {
        it(`responds with 404`, (done) => {
            const plantId = 123456;
            request
            .patch(`/plants/${plantId}`)
            .expect(404, { 
                error: { 
                    message: `Plant does not exist`} 
                });
                done()
        });
    });

    context('Given there are plants in the database', () => {
        const testPlants = makePlantArray();

        beforeEach('insert plant', () => {
            return db
            .into('plant_information')
            .insert(testPlants);
        });

        it('responds with 204 and updates the plant', (done) => {
            const idToUpdate = 2;
            const updatePlant = {
                "plant_name": "updated plant",
                "scientific_name": "updated something scientific",
                "plant_type": "updated Leafy",
                "details": "updated insert interesting details here",
                "maintenance_level": 2,
                "water_requirements": 2,
                "light_conditions": 2,
                "image_url": "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            };
            const expectedPlants = {
                ...testPlants[idToUpdate - 1],
                ...updatePlant,
              };
              request
              .patch(`/plants/${idToUpdate}`)
              .send(updatePlant)
              .expect(204)
              .then((res) => 
              supertest(app)
              .get(`/plants/${idToUpdate}`)
              .expect(updatePlant)
              );
              done()
        });

        it(`responds with 400 when no required fields supplied`, (done) => {
            const idToUpdate = 2;
            request
            .patch(`/plants/${idToUpdate}`)
            .send({ irrelevanField: 'foo'})
            .expect(400, {
                error: {
                    message: `Request body must contain either 'plant name', 'scientific_name', 'details' etc.`,
                }, 
            });
            done()
        });

        it(`responds with 204 when updating only a subset of fields`, (done) => {
            const idToUpdate = 2;
            const updatePlant = {
                plant_name: "updated plant name",
            };
            const expectedPlants = {
                ...testPlants[idToUpdate -1],
                ...updatePlant,
            };
            request
            .patch(`/plants/${idToUpdate}`)
            .send({ 
                ...updatePlant,
                fieldToIgnore: "should not be in GET response",
            })
            .expect(204)
            .then((res) => 
                supertest(app)
                    .get(`/plants/${idToUpdate}`)
                    .expect(expectedPlants)
                );
                done()
            });
        });
    });
});
