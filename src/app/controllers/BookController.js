const BookRepository = require('../repositories/BookRepository');

class BookController {

    async index(request, response) {
      const { orderBy } = request.query;
      const books = await BookRepository.findAll(orderBy);
      response.json(books);
    }

    async show(request, response) {
      const { id } = request.params;
      const book = await BookRepository.findById(id);

      if(!book) {
        return response.status(404).json({ error: 'Book not found'});
      }

      response.json(book);
    }

    async store(request, response) {
      const { titulo, sinopse, numPaginas, anoLancamento, autores } = request.body;

      if(!titulo){
        return response.status(400).json({ error: 'Título obrigatório'});
      }

      if(autores && autores.length == 0){
        return response.status(400).json({ error: 'Necessário informar ao menos um autor'});
      }

      const book = await BookRepository.create({
        titulo, sinopse, numPaginas, anoLancamento, autores
      });

      response.status(201).json(book);
    }

    async update(request, response) {
      const { id } = request.params;
      const { titulo, sinopse, numPaginas, anoLancamento, autores } = request.body;

      const bookExists = await BookRepository.findById(id);
      if(!bookExists) {
        return response.status(404).json({ error: 'Book not found'});
      }

      if(!titulo){
        return response.status(400).json({ error: 'Título obrigatório'});
      }

      if(!autores || autores.length == 0){
        return response.status(400).json({ error: 'Necessário informar ao menos um autor'});
      }

      const book = await BookRepository.update(id, {
        titulo, sinopse, numPaginas, anoLancamento, autores
      });

      response.json(book);
    }

    async delete(request, response) {
      const { id } = request.params;

      await BookRepository.delete(id);
      response.sendStatus(204);
    }

}

// Singleton
module.exports = new BookController();