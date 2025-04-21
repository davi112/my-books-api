const db = require('../../database');

class BookRepository{

    async findAll(orderBy)
    {
      let direction = (!orderBy || orderBy.toUpperCase() == 'ASC') ? 'ASC' : orderBy;

      if(orderBy.toUpperCase() != 'DESC'){
          direction = 'ASC';
      }

      const rows = await db.query(
        `SELECT l.*,
        json_agg(json_build_object('id', a.id,'nome', a.nome)) AS autores
        FROM livro l
          LEFT JOIN autor_livro al ON l.id = al.id_livro
          LEFT JOIN autor a on a.id = al.id_autor
        GROUP BY l.id, l.titulo, l.sinopse, l.num_paginas, l.lancamento
        ORDER BY l.titulo ${direction};`
      );

      return rows;
    }

    async findById(id) {
      const [ row ] = await db.query(`SELECT l.*,
        json_agg(json_build_object('id',a.id,'nome', a.nome)) AS autores
        FROM livro l
          LEFT JOIN autor_livro al ON l.id = al.id_livro
          LEFT JOIN autor a on a.id = al.id_autor
        WHERE l.id = $1
        GROUP BY l.id, l.titulo, l.sinopse, l.num_paginas, l.lancamento;`, [id]
      );
      return row;
    }

    async create({titulo, sinopse, numPaginas, anoLancamento, autores }){
        await db.query('BEGIN;');
        const [row] = await db.query(`INSERT INTO livro(titulo,sinopse,num_paginas,lancamento) VALUES ($1, $2, $3 ,$4) RETURNING *;`, [titulo, sinopse, numPaginas, anoLancamento]);

        const authorStatements = autores.map((author,index) => `($${index*2+1},$${index*2+2})`).join(",");
        const values = autores.flatMap((author) => [row.id, author]);

        const authorsData = await db.query(`INSERT INTO autor_livro (id_livro, id_autor) VALUES ${authorStatements} RETURNING *;`, values);

        await db.query('COMMIT;');
        const createdBook = {
            ...row,
            authors: authorsData
        };
        return createdBook;
    }

    async update(id, { titulo, sinopse, numPaginas, anoLancamento, autores }){
      await db.query('BEGIN;');

      const [row] = await db.query(`
            UPDATE livro SET
            titulo = $1, sinopse = $2, num_paginas = $3,
            lancamento = $4
            WHERE id = $5
            RETURNING *
        `, [titulo, sinopse, numPaginas, anoLancamento, id]);

      await db.query('DELETE FROM autor_livro WHERE id_livro = $1', [id]);

      const authorStatements = autores.map((author,index) => `($${index*2+1},$${index*2+2})`).join(",");
      const values = autores.flatMap((author) => [row.id, author]);
      const authorsData = await db.query(`INSERT INTO autor_livro (id_livro, id_autor) VALUES ${authorStatements} RETURNING *;`, values);

      await db.query('COMMIT;');
      const updatedBook = {
          ...row,
          authors: authorsData
      };

      return updatedBook;
    }

    async delete(id){
      const deleteOp = await db.query('DELETE FROM livro WHERE id = $1', [id]);
      return deleteOp;
    }

}

 module.exports = new BookRepository();