const express = require('express');
const routes = require('./routes');
const db = require('./database');

const app = express();

app.use(express.json()) //MIDDLEWARE

app.use(routes);

//MIDDLEWARE - ERROR HANDLER (exemplo)
app.use((error, request, response, next) => {
  console.log(error);
  db.query('ROLLBACK');
  response.sendStatus(500);
});

app.listen(3000, () => console.log("Servidor iniciado em http://localhost:3000"));

//docker compose down && docker rmi my-books-api-node-app:latest && docker compose up --build -d