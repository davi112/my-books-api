const AuthorRepository = require('../repositories/AuthorRepository');

class AuthorController {

  async index(request, response){
    const authors = await AuthorRepository.findAll();
    response.json(authors);
  }

  async show(request, response){
    const { id } = request.params;

    const author = await AuthorRepository.findById(id);

    if(!author){
      return response.status(404).json({error: "Author not found"});
    }

    response.json(author);
  }

  async store(request, response){
    const { nome, biografia } = request.body;

    let erros = [];
    if(!nome){
      erros.push('Nome: campo obrigatório não informado');
    }

    if(!biografia){
      erros.push('Biografia: campo obrigatório não informado');
    }

    if(erros.length > 0){
      return response.status(400).json({errors: erros});
    }

    const author = await AuthorRepository.create({
      nome, biografia
    });

    response.status(201).json(author);
  }

  async update(request, response){
    const { id } = request.params;
    const { nome, biografia } = request.body;

    const authorExists = await AuthorRepository.findById(id);

    if(!authorExists) {
      return response.status(404).json({ error: 'Author not found'});
    }

    let erros = [];
    if(!nome){
      erros.push('Nome: campo obrigatório não informado');
    }

    if(!biografia){
      erros.push('Biografia: campo obrigatório não informado');
    }

    if(erros.length > 0){
      return response.status(400).json({errors: erros});
    }

    const author = await AuthorRepository.update(id, { nome, biografia } );

    response.json(author);
  }

  async delete(request, response){
    const { id } = request.params;
    await AuthorRepository.delete(id);
    response.sendStatus(204);
  }

  async showBooks(request, response){
    const { id } = request.params;
    console.log(id);
    const rows = await AuthorRepository.findBooksByAuthor(id);
    return response.json(rows);
  }
}

module.exports = new AuthorController();