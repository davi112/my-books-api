const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'My Books API',
      version: '1.0.0',
      description: 'Esta é uma API desenvolvida com Express que contém operações CRUD. Trata-se de uma aplicação desenvolvida como parte de um seminário apresentado à disciplina de Desenvolvimento de Aplicações Distribuídas, da Pontifícia Universidade Católica de Minas Gerais, como requisito parcial para aprovação na disciplina. '
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ['./src/routes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
