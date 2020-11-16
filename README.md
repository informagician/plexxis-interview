# Plexxis Interview Exercise
## About the project
This project was an endeavour to satisfy Plexxis Software interview code challenge requirement.

It can be viewed live on (Heroku)[]

Even though this is a working code, I DO NOT claim it to be perfectly written or to be secure. There is still a lot to be done and improvements that can be made in regards to security, performance, testing, aesthetics and user experience. My time budget of 16 hours allowed me to accomplish this much.

Working with [React Table](https://react-table.tanstack.com/) was specifically fun.

Please read the __IMPORTANT__ section of this document for more information.

## Screenshots


## Tech Stack

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/) + [Express js](https://expressjs.com/)
- MySQL
- [React Router](https://reactrouter.com/): to manage routes, history etc.
- [Axios](https://github.com/axios/axios): promise based HTTP client
- [Knex](http://knexjs.org/): SQL query builder for MySQL, all migration, seeding and models are written with knex syntax
- [React Hook Form](https://react-hook-form.com/): forms and validation
- [Font Awesome](https://fontawesome.com/)
- [React Table](https://react-table.tanstack.com/)

## IMPORTANT 
Due to a git complication (my mistake), I lost my branch and all atomic commits. I copied all the code to a new repo to push. I commit often!

Considering time constraints and nature of presentational data (tables), I did not make the application responsive. Also some accessibility best practices were not baked into code.


## TODO
Before taking the app for drive, I would like to share my opinion about features to be added or bugs to be fixed:

### Feature
- Add Sign in/out (authentication)

### Backend and Database
- Rate limiter
- API KEY
- Data validation
- Migrate to Postgres (Tinyint issue)
- Write test
- ...

### Frontend
- API KEY
- Make responsive based on use case
- Make accessible
- Add more filtering, pagination, search and more table utilities
- More validation on forms: Regex (color, code), City (Google), Color names (web colors?)
- Write test
- Migrate to SCSS/LESS
- ...

## Installation

Step 0 - You'll need to have Node and MySQL installed on your machine.

Step 1 - Please clone the repo

Step 2 - Install requirements

```yarn```

Step 3 - From .env file take/modify the MySQL user (db_user, db_pass) and add to your MySQL credentials

Step 4 - Run the Migration to ceate tables

``` npx knex migrate:latest ```

Step 5 - (Optional) Seed the database

``` npx knex seed:run ```

Step 6 - Have fun and please let me know your feedback


## API Reference


## 

