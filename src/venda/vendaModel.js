const db = require("../db/db.js");

class VendaModel {

    static async cadastrar(cliente_id, funcionario_id, data_venda, valor_total, forma_pagamento) {
        const sql = "INSERT INTO vendas (cliente_id, funcionario_id, data_venda, valor_total, forma_pagamento) VALUES (?, ?, ?, ?, ?)";
        const values = [cliente_id, funcionario_id, data_venda, valor_total, forma_pagamento];
        const [resultado] = await db.execute(sql, values);

        return resultado;
    }

    static async listar(id = null) {
        let sql = `SELECT v.*, c.nome as cliente_nome FROM vendas v 
                   LEFT JOIN clientes c ON v.cliente_id = c.id`;
        const values = [];

        if (id) {
            sql += " WHERE v.id = ?";
            values.push(id);
        }

        const [resultado] = await db.execute(sql, values);
        return resultado;
    }

    static async editarPorId(id, cliente_id, valor_total, data_venda) {
        const sql = "UPDATE vendas SET cliente_id = ?, valor_total = ?, data_venda = ? WHERE id = ?";
        const values = [cliente_id, valor_total, data_venda, id];
        const [resultado] = await db.execute(sql, values);

        return resultado;
    }

    static async excluirPorId(id) {
        const sql = "DELETE FROM vendas WHERE id = ?";
        const values = [id];
        const [resultado] = await db.execute(sql, values);

        return resultado;
    }
}

module.exports = VendaModel;