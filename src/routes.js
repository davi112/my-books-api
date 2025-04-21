const { Router } = require('express');
const BookController = require('./app/controllers/BookController');
const AuthorController = require('./app/controllers/AuthorController');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const router = Router();

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Livro:
 *       type: object
 *       required:
 *          - titulo
 *          - autores
 *       properties:
 *          id:
 *              type: string
 *              description: id do livro gerado automaticamente
 *          titulo:
 *              type: string
 *          sinopse:
 *              type: string
 *          numPaginas:
 *              type: integer
 *          anoLancamento:
 *              type: integer
 *          autores:
 *               type: array
 *               items:
 *                 type: string
 *               description: array de IDs dos autores
 *       example:
 *            id: "ea519dab-6a54-4538-9b10-a59500444f9a"
 *            titulo: "The Slow Regard of the Silent Things"
 *            sinopse: "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms."
 *            numPaginas: 176
 *            anoLancamento: 2014
 *            autores: ["ea519dab-6a54-4538-9b10-a59500444f9a"]
  *     Autor:
 *       type: object
 *       required:
 *          - nome
 *       properties:
 *          id:
 *              type: string
 *              description: id do autor gerado automaticamente
 *          nome:
 *              type: string
 *          biografia:
 *              type: string
 *       example:
 *            id: "ea519dab-6a54-4538-9b10-a59500444f9a"
 *            nome: "Patrick Rothfuss"
 *            biografia: "It all began when Pat Rothfuss was born to a marvelous set of parents. Throughout his formative years they encouraged him to do his best and gave him good advice."
 */

/**
 * @swagger
 *
 * /books:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Books]
 *     parameters:
 *        - in: query
 *          name: orderBy
 *          schema:
 *             type: string
 *          description: ordenacao da lista de livros. ASC = ordem alfabética, DESC = ordem alfabética reversa
 *     responses:
 *       200:
 *         description: Lista de livros
 *         content:
 *            application/json:
 *               schema:
 *                  type: array
 *                  items:
 *                     $ref: '#/components/schemas/Livro'
 *       500:
 *          description: Ocorreu algum erro interno no processamento da requisição no servidor
 */
router.get('/books',BookController.index);
/**
 * @swagger
 *
 * /books/{id}:
 *   get:
 *     summary: Lista os dados de um livro com um determinado ID
 *     tags: [Books]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *             description: id do livro a ser exibido
 *     responses:
 *       200:
 *         description: Detalhes do livro
 *         content:
 *            application/json:
 *               schema:
 *                     $ref: '#/components/schemas/Livro'
 *       404:
 *         description: Livro não encontrado
 *       500:
 *         description: Ocorreu algum erro interno no processamento da requisição no servidor
 */
router.get('/books/:id', BookController.show);
/**
 * @swagger
 *
 * /books/{id}:
 *   delete:
 *     summary: Remove o livro associado a um determinado ID
 *     tags: [Books]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *             description: id do livro a ser deletado
 *     responses:
 *       204:
 *          description: Livro deletado
 *       500:
 *         description: Ocorreu algum erro interno no processamento da requisição no servidor
 */
router.delete('/books/:id', BookController.delete);
/**
 * @swagger
 *
 * /books:
 *   post:
 *     summary: Cadastrar um novo livro
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livro'
 *           example:
 *             titulo: "The Slow Regard of the Silent Things"
 *             sinopse: "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms."
 *             numPaginas: 176
 *             anoLancamento: 2014
 *             autores: ["ea519dab-6a54-4538-9b10-a59500444f9a"]
 *     responses:
 *       201:
 *         description: Livro Criado
 *         content:
 *            application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Livro'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Ocorreu algum erro interno no processamento da requisição no servidor
 */
router.post('/books/', BookController.store);
/**
 * @swagger
 *
 * /books{id}:
 *   put:
 *     summary: Atualizar um livro
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Livro'
 *           example:
 *             titulo: "The Slow Regard of the Silent Things"
 *             sinopse: "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms."
 *             numPaginas: 176
 *             anoLancamento: 2014
 *             autores: ["ea519dab-6a54-4538-9b10-a59500444f9a"]
 *     responses:
 *       200:
 *         description: Livro Atualizado
 *         content:
 *            application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Livro'
 *       404:
 *         description: Livro não encontrado
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Ocorreu algum erro interno no processamento da requisição no servidor
 */
router.put('/books/:id', BookController.update);

/**
 * @swagger
 *
 * /authors:
 *   get:
 *     summary: Lista todos os autores
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: Lista de autores
 *         content:
 *            application/json:
 *               schema:
 *                  type: array
 *                  items:
 *                     $ref: '#/components/schemas/Autor'
 *       500:
 *          description: Ocorreu algum erro interno no processamento da requisição no servidor
 */
router.get('/authors',AuthorController.index);
/**
 * @swagger
 *
 * /authors/{id}:
 *   get:
 *     summary: Lista os dados de um autor com um determinado ID
 *     tags: [Authors]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *             description: id do autor a ser exibido
 *     responses:
 *       200:
 *         description: Detalhes do autor
 *         content:
 *            application/json:
 *               schema:
 *                     $ref: '#/components/schemas/Autor'
 *       404:
 *         description: Autor não encontrado
 *       500:
 *         description: Ocorreu algum erro interno no processamento da requisição no servidor
 */
router.get('/authors/:id', AuthorController.show);
/**
 * @swagger
 *
 * /authors/{id}/books:
 *   get:
 *     summary: Lista todos os livros de um determinado autor
 *     tags: [Authors]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *             description: id do autor
 *     responses:
 *       200:
 *         description: Livros do autor
 *         content:
 *            application/json:
 *               schema:
 *                  type: object
 *                  properties:
 *                      livros:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Livro'
 *       404:
 *         description: Autor não encontrado
 *       500:
 *         description: Ocorreu algum erro interno no processamento da requisição no servidor
 */
router.get('/authors/:id/books', AuthorController.showBooks);
/**
 * @swagger
 *
 * /authors/{id}:
 *   delete:
 *     summary: Remove o autor associado a um determinado ID
 *     tags: [Authors]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *             description: id do autor a ser deletado
 *     responses:
 *       204:
 *          description: Autor deletado
 *       500:
 *         description: Ocorreu algum erro interno no processamento da requisição no servidor
 */
router.delete('/authors/:id', AuthorController.delete);
/**
 * @swagger
 *
 * /authors:
 *   post:
 *     summary: Cadastrar um novo autor
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Autor'
 *           example:
 *              nome: "Patrick Rothfuss"
 *              biografia: "It all began when Pat Rothfuss was born to a marvelous set of parents. Throughout his formative years they encouraged him to do his best and gave him good advice."
 *     responses:
 *       201:
 *         description: Autor Criado
 *         content:
 *            application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Autor'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Ocorreu algum erro interno no processamento da requisição no servidor
 */
router.post('/authors/', AuthorController.store);
/**
 * @swagger
 *
 * /authors{id}:
 *   put:
 *     summary: Atualizar um autor
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Autor'
 *           example:
 *              nome: "Patrick Rothfuss"
 *              biografia: "It all began when Pat Rothfuss was born to a marvelous set of parents. Throughout his formative years they encouraged him to do his best and gave him good advice."
 *     responses:
 *       200:
 *         description: Autor Atualizado
 *         content:
 *            application/json:
 *               schema:
 *                  $ref: '#/components/schemas/Autor'
 *       404:
 *         description: Autor não encontrado
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Ocorreu algum erro interno no processamento da requisição no servidor
 */
router.put('/authors/:id', AuthorController.update);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec));

module.exports = router;