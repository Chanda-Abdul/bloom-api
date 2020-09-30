# Thinkful Full Stack Capstone - Bloom App API Server

## Programmer
Chanda Hubbard

## Summary

While enrolled in Thinkful's Web Development bootcamp I created this Full-stack Capstone project.  Bloom is an interactive web application that was created to view and manage your plant collection.  This app was created so that you can view all of your plants, and keep track of thier care and maintenance.

## Bloom Server
Link to the [Live heroku server](https://polar-sierra-05851.herokuapp.com)

## Bloom Client
Link to the [Client Repo](https://github.com/ChandaHubbard/bloom-client)

## Technology Used
#### Front-end
- React
    - Router
    - Context
    - Axios
    - Libraries
        - Sweet Alerts
- HTML
- CSS
- Vercel(Zeit)

#### Back-end
- Node.js
- Express
    - Knex
    - Mocha, Chai & Supertest
    - Morgan, CORS, Helmet
- PostgreSQL
    - Elephant SQL
- Heroku

# 

# Bloom API
- Bloom's back-end consists of an API server that was created with Node.js, Express, Knex, and PostgreSQL
 
- Bloom's API service consists of `/GET` `/DELETE` `/POST` and `/PATCH` endpoints

- The API was created locally and deployed to heroku.  The deployed API can be accessed through heroku 
[here](https://polar-sierra-05851.herokuapp.com).

### /GET at `/plants`
The user can access the `/GET` endpoint through the client by visiting the `/view` page and all plants will be displayed.  The `/GET` endpoint can also be accessed at `/plants` on the back-end through the heroku server at [https://polar-sierra-05851.herokuapp.com/plants](https://polar-sierra-05851.herokuapp.com/plants).

### /GET at `/plants/:id`
The `/GET/:id` endpoint can be accessed at `/plants/:id` on the back-end through the heroku server at [https://polar-sierra-05851.herokuapp.com/plants/:id](https://polar-sierra-05851.herokuapp.com/plants/85).

### /DELETE at `/plants/:id`
The `/DELETE` endpoint is used to delete specific plants by id. The user can access the `/DELETE` endpoint through the client by visiting the `/view` page and selecting the <i>Delete</i> button next to the plant that they would like to delete.  The `/DELETE` endpoint can also be accessed at `/plants` on the back-end through the heroku server at [https://polar-sierra-05851.herokuapp.com/plants](https://polar-sierra-05851.herokuapp.com/plants).

### /POST at `/plants`
The user can access the `/POST` endpoint through the client by visiting the `/add` page and filling out the form then selecting the <i>Add plant!</i> button.  The `/POST` endpoint can also be accessed at `/plants` on the back-end through the heroku server at [https://polar-sierra-05851.herokuapp.com/plants](https://polar-sierra-05851.herokuapp.com/plants).

### /PATCH at `/plants/:id`
The `/PATCH/:id` is used to update specifc plants by id and the endpoint can be accessed at `/plants/:id` on the back-end through the heroku server at [https://polar-sierra-05851.herokuapp.com/plants/:id](https://polar-sierra-05851.herokuapp.com/plants/75). -->

# 
### Bloom's API service consists of data that is stored in a PostgreSQL database
# 

- The database creation scripts can be found at `/migrations`
- The database is initially seeded with data that can be found at `/scripts/seeds`
- All tables are hosted remotely on <b>ElephantSQL</b> and can be accessed 
[here](	postgres://xobyklgi:mFIiNp2lMwOg9rEodx2o-VpSxsFjKpEx@hanno.db.elephantsql.com:5432/xobyklgi)

- The PostgreSQL database consists of four tables 
    - <b>light_conditions</b> 
    <img src="./src/screens/light_conditions.png" alt="light_conditions table">

    - <b>maintenance</b> 
    <img src="./src/screens/light_conditions.png" alt="maintenance table">

    - <b>water_level</b> 
    <img src="./src/screens/water_level.png" alt="water_level table">

    - <b>plant_information</b> 
    <img src="./src/screens/plant_information.png" alt="plant_information table">

    - The tables share relations and can be joined with the <b>PostgreSQL</b> query of <br>

````
SELECT pi.plant_name, pi.scientific_name, pi.plant_type, pi.details, ma.maintenance, wl.water, lc.light, pi.image_url
FROM plant_information AS pi  
INNER JOIN maintenance AS ma ON pi.maintenance_level = ma.id  
INNER JOIN water_level AS wl ON pi.water_requirements = wl.id  
INNER JOIN light_conditions AS lc ON pi.light_conditions = lc.id;
````
<br><br>
<img src="./src/screens/table_join.png" alt="table join">

# 

## Other features to implement in future versions

- [ ] Incorporate the `/PATCH` endpoint into the client. 

