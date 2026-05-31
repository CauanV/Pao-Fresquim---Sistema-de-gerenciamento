const db = require('../db/db.js');

class FuncionarioModel {

    static async cadastrar(nome, endereco, telefone_pessoal, telefone_emergencial, data_admissao, cargo) {

        const sql = " INSERT INTO funcionarios(nome, endereco, telefone_pessoal, telefone_emergencial, data_admissao, cargo) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [nome, endereco, telefone_pessoal, telefone_emergencial, data_admissao, cargo];
        const [resultado] = await db.execute(sql, values);

        return resultado;
    }

    static async listar() {

        const sql = 'SELECT * FROM funcionarios';
        const [resultados] = await db.execute(sql);

        return resultados;
    }

    static async buscarPorId(id) {

        const sql = 'SELECT * FROM funcionarios WHERE id = ?';
        const [resultados] = await db.execute(sql, [id]);

        return resultados[0];
    }

    static async buscarPorNome(nome) {

        const sql = "SELECT * FROM funcionarios WHERE nome LIKE ?";
        const [resultados] = await db.execute(sql, [`%${nome}%`]);

        return resultados;
    }

    static async buscarPorCpf(cpf) {

        const sql = "SELECT * FROM funcionarios WHERE cpf = ?";
        const [resultados] = await db.execute(sql, [cpf]);

        return resultados[0];
    }

    static async editarPorId(id, nome, endereco, telefone_pessoal, telefone_emergencial, data_admissao, cargo) {

        const sql = "UPDATE funcionarios SET nome = ?, endereco = ?, telefone_pessoal = ?, telefone_emergencial = ?, data_admissao = ?, cargo = ? WHERE id = ?";
        const values = [nome, endereco, telefone_pessoal, telefone_emergencial, data_admissao, cargo, id];
        const [resultado] = await db.execute(sql, values);

        return resultado;
    }

    static async excluirPorId(id) {

        const sql = 'DELETE FROM funcionarios WHERE id = ?';
        const [resultado] = await db.execute(sql, [id]);

        return resultado;
    }
}

module.exports = FuncionarioModel;