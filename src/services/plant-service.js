const PlantService = {
  getPlants(knex) {
    return knex
    .select("*")
    .from("plant_information");
  },
  getPlantById(knex, id) {
    return knex
    .from("plant_information")
    .select("*")
    .where("id", id)
    .first();
  },
  getAllPlants(knex, id) {
      return knex
      .select(
          'plant_information.id',
          'plant_information.plant_name',
          'plant_information.scientific_name',
          'plant_information.plant_type',
          'plant_information.details',
          'maintenance.maintenance',
          'water_level.water',
          'light_conditions.light',
          'plant_information.image_url'
      ).from('plant_information')
    .innerJoin('maintenance', 'plant_information.maintenance_level', 'maintenance.id')
    .innerJoin('water_level', 'plant_information.water_requirements', 'water_level.id')
    .innerJoin('light_conditions', 'plant_information.light_conditions', 'light_conditions.id')
  },
  addNewPlant(knex, newPlant) {
      return knex
      .insert(newPlant)
      .into("plant_information")
      .returning('*')
      .then((rows) => {
          return rows[0];
      });
  }, 
  deletePlant(knex, id) {
      return knex('plant_information')
      .where({ id })
      .delete();
  }, 
  updatePlant(knex, id, newPlantFields) {
      return knex
      .from('plant_information')
      .where({ id })
      .update(newPlantFields)
  }
};

module.exports = PlantService;
