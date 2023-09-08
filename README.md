# Person Management App

This is a person management application built with Node.js, Express, and MySQL. The app allows performing CRUD (Create, Read, Update, Delete) operations on a MySQL database.

## Prerequisites

- Docker
- Docker Compose

## Usage Instructions

1. Clone this repository on your local machine:
```bash
   git clone https://github.com/fedeberon/person-management-app.git   
```

2. Change to the project directory:
```bash
cd person-management-app
```
3. Create a .env file in the project root and configure the environment variables:
```
MYSQL_ROOT_PASSWORD=your_root_password
MYSQL_DATABASE=person_db
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
JWT_SECRET=jwt_secret_key
```
4. Start the containers using Docker Compose:
```bash
docker-compose up -d
```
5. Access the API from your browser or a tool like Postman:
```
http://localhost:3000/api/person
```
6.To stop the containers, run:
```bash
docker-compose down
```

## Automated Token Configuration in Postman
```
var jsonData = pm.response.json();
pm.globals.set("token", jsonData.token);
```

## Documentation

- [Jest Documentation](https://jestjs.io/docs/getting-started): Jest is a widely used JavaScript testing framework for unit testing, integration testing, and end-to-end testing.

- [Sequelize Documentation](https://sequelize.org/master/): Sequelize is an Object-Relational Mapping (ORM) for Node.js commonly used with relational databases.


