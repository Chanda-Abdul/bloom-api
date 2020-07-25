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
    - Libraries
        - Axios
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

- The API was created locally and deployed to heroku.  The API can be accessed through heroku 
[here](https://polar-sierra-05851.herokuapp.com).

### /GET at `/plants`
The user can access the `/GET` endpoint through the client by visiting the `/view` page and all expenses will be displayed.  The `/GET` endpoint can also be accessed at `/plants` on the back-end through the heroku server at [https://polar-sierra-05851.herokuapp.com/plants](https://polar-sierra-05851.herokuapp.com/plants).

### /GET at `/plants/:id`
The `/GET/:id` endpoint can be accessed at `/plants/:id` on the back-end through the heroku server at [https://polar-sierra-05851.herokuapp.com/plants/:id](https://polar-sierra-05851.herokuapp.com/plants/85).

### /DELETE at `/expenses/:id`
The `/DELETE` endpoint is used to delete specific expenses by id. The user can access the `/DELETE` endpoint through the client by visiting the `/budget` page and selecting the <i>Delete</i> button next to the expense that they would like to delete.  The `/DELETE` endpoint can also be accessed at `/expenses` on the back-end through the heroku server at [https://fast-garden-40399.herokuapp.com/expenses](https://fast-garden-40399.herokuapp.com/expenses).

### /POST at `/expenses`
The user can access the `/POST` endpoint through the client by visiting the `/create` page and filling out the form then selecting the <i>Add Expense</i> button.  The `/POST` endpoint can also be accessed at `/expenses` on the back-end through the heroku server at [https://fast-garden-40399.herokuapp.com/expenses](https://fast-garden-40399.herokuapp.com/expenses).

### /PATCH at `/expenses/:id`
The `/PATCH/:id` is used to update specifc expenses by id and the endpoint can be accessed at `/expenses/:id` on the back-end through the heroku server at [https://fast-garden-40399.herokuapp.com/expenses/:id](https://fast-garden-40399.herokuapp.com/expenses/75). -->

# 
<!-- ### Bloom's API service consists of data that is stored in a PostgreSQL database
# 

- The database creation scripts can be found at `/migrations`
- The database is initially seeded with data that can be found at `/scripts/seeds`
- Both tables are hosted remotely on <b>ElephantSQL</b> and can be accessed 
[here](postgres://ymzzpjmz:kUdfw2oErRwCaXcuLHqSq0mBimn9DRmm@hanno.db.elephantsql.com:5432/ymzzpjmz)

- The PostgreSQL database consists of two tables 
    - <b>budget_expenses</b> 
    <img src="images/budget_expenses.png" alt="budget_expenses table">

    - <b>expense_type</b> 
    <img src="images/expense_type.png" alt="expense_type table">

    - The tables share the relation of `expense_type(id)/budget_expenses(type_id)` and can be joined with the <b>PostgreSQL</b> query of <br>

````
SELECT budget_expenses.id, name, amount, type, category, date
FROM budget_expenses
INNER JOIN expense_type
ON (budget_expenses.type_id = expense_type.id);
````
<br><br>
<img src="images/tablejoin.png" alt="table join table"> -->

# 

## Other features to implement in future versions

[ ] Incorporate the `/PATCH` endpoint into the client. 

