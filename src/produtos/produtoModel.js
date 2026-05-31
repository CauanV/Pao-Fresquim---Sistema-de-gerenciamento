const db = require('../db/db.js');

class ProdutoModel {

    static async cadastrar(nome, preco, codigoBarras, unidade) {
        const query = 'INSERT INTO produtos (nome, preco, codigo_barras, unidade) VALUES (?, ?, ?, ?)';
        const values = [nome, preco, codigoBarras, unidade];
        const [resultado] = await db.execute(query, values);

        return resultado;
    }


    static async listar() {
        const query = 'SELECT * FROM produtos';
        const [resultado] = await db.execute(query);

        return resultado;
    }

    static async buscarPorId(id) {
        const query = 'SELECT * FROM produtos WHERE id = ?';
        const [resultado] = await db.execute(query, [id]);

        return resultado[0];
    }

    static async buscarPorNome(nome) {
        const query = 'SELECT * FROM produtos WHERE nome LIKE ?';
        const [resultado] = await db.execute(query, [`%${nome}%`]);

        return resultado;
    }

    static async buscarPorCodigoBarras(codigoBarras) {
        const query = 'SELECT * FROM produtos WHERE codigo_barras = ?';
        const [resultado] = await db.execute(query, [codigoBarras]);

        return resultado[0];
    }

    static async editarPorId(id, nome, preco, codigoBarras, unidade) {
        const query = 'UPDATE produtos SET nome = ?, preco = ?, codigo_barras = ?, unidade = ? WHERE id = ?';
        const values = [nome, preco, codigoBarras, unidade, id];
        const [resultado] = await db.execute(query, values);

        return resultado;
    }

    static async excluirPorId(id) {
        const query = 'DELETE FROM produtos WHERE id = ?';
        const values = [id];
        const [resultado] = await db.execute(query, values);

        return resultado;
    }
}

module.exports = ProdutoModel;