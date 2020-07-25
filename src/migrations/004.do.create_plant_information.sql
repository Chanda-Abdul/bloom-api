CREATE TABLE plant_information (
    id serial PRIMARY KEY,
    plant_name TEXT NOT NULL,
    scientific_name TEXT NOT NULL,
    details TEXT NOT NULL,
    plant_type TEXT,
    maintenance_level INTEGER REFERENCES maintenance(id),
    water_requirements INTEGER REFERENCES water_level(id),
    light_conditions INTEGER REFERENCES light_conditions(id),
    image_url TEXT
);





