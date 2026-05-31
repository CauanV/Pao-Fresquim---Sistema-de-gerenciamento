const db = require('../db/db.js');

class ClienteModel {

    static async cadastrar(nome, telefone, endereco, cpf, email) {

        const sql = "INSERT INTO clientes (nome, telefone, endereco, cpf, email) VALUES (?, ?, ?, ?, ?)";
        const values = [nome, telefone, endereco, cpf, email];
        const [resultado] = await db.execute(sql, values);

        return resultado;
    }


    static async listar() {
        const sql = "SELECT * FROM clientes";
        const [resultados] = await db.execute(sql);

        return resultados;
    }

    static async buscarPorId(id) {
        const sql = "SELECT * FROM clientes WHERE id = ?";
        const [resultados] = await db.execute(sql, [id]);

        return resultados[0];
    }

    static async buscarPorNome(nome) {
        const sql = "SELECT * FROM clientes WHERE nome LIKE ?";
        const [resultados] = await db.execute(sql, [`%${nome}%`]);

        return resultados;
    }

    static async buscarPorCpf(cpf) {
        const sql = "SELECT * FROM clientes WHERE cpf = ?";
        const [resultados] = await db.execute(sql, [cpf]);

        return resultados[0];
    }

    static async editarPorId(id, nome, telefone, endereco, cpf, email) {
        const sql = "UPDATE clientes SET nome = ?, telefone = ?, endereco = ?, cpf = ?, email = ? WHERE id = ?";
        const values = [nome, telefone, endereco, cpf, email, id];
        const [resultado] = await db.execute(sql, values);

        return resultado;
    }

    static async excluirPorId(id) {
        const sql = "DELETE FROM clientes WHERE id = ?";
        const [resultado] = await db.execute(sql, [id]);

        return resultado;
    }
}

module.exports = ClienteModel;