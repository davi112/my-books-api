const db = require('../../database');

class AuthorRepository {

  async findAll(orderBy)
  {
    const rows = await db.query(`SELECT * FROM autor ORDER BY nome`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM autor WHERE id = $1`, [id]);
    return row;
  }

  async create({nome, biografia}){
    const [row] = await db.query(`
          INSERT INTO autor (nome, biografia)
          VALUES ( $1, $2)
          RETURNING *
      `, [nome, biografia]);

    return row;
  }

  async update(id, {nome, biografia}){
    const [row] = await db.query(`UPDATE autor SET nome = $1, biografia = $2 WHERE id = $3 RETURNING *`, [nome, biografia, id]);

    return row;
  }

  async delete(id){
    const deleteOp = await db.query('DELETE FROM autor WHERE id = $1', [id]);
    return deleteOp;
  }

  async findBooksByAuthor(id){
    const [rows] = await db.query(`
          SELECT json_agg(json_build_object('id', l.id,'titulo', l.titulo, 'sinopse', l.sinopse, 'lancamento', l.lancamento)) AS livros
          FROM
          autor a
          JOIN autor_livro al on a.id = al.id_autor
          JOIN livro l on al.id_livro = l.id
          WHERE a.id = $1
          GROUP BY a.id;
      `, [id]);

      return rows;
  }
}

module.exports = new AuthorRepository();