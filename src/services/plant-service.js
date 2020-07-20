const PlantService = {
  getPlants(knex) {
    return knex
    .select("*")
    .from("plant_information");
  },
  getPlantById(knex, id) {
    return knex
    .from("plant_information")
    .select("*").where("id", id)
    .first();
  },
  getAllPlants(knex, id) {
      return knex.select(
          'pi.plant_name',
          'pi.scientific_name',
          'pi.plant_type',
          'pi.details',
          'ma.maintenance',
          'wl.water',
          'lc.light',
          'pi.image_url'
      ).from('plant_information')
      .as('pi')
      .innerJoin('maintenance')
      .as('ma')
      .on('pi.maintenance_level', 'ma.id')
      .innerJoin('water_level')
      .as('wl')
      .on('pi.water_requirements', 'wl.id')
      .innerJoin('light_conditions')
      .as('lc')
      .on('pi.light_conditions', 'lc.id')
  }
};



// SELECT pi.plant_name, pi.scientific_name, pi.plant_type, pi.details, ma.maintenance, wl.water, lc.light, pi.image_url
// FROM plant_information AS pi  
// INNER JOIN maintenance AS ma ON pi.maintenance_level = ma.id  
// INNER JOIN water_level AS wl ON pi.water_requirements = wl.id  
// INNER JOIN light_conditions AS lc ON pi.light_conditions = lc.id;

module.exports = PlantService;
