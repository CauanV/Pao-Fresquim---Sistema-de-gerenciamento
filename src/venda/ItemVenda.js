const db = require("../db/db.js");

class ItemVenda {

    static async cadastrar(venda_id, produto_id, quantidade, preco_unitario) {

        const subtotal = quantidade * preco_unitario;
        const sql = `
        INSERT INTO item_venda
        (venda_id, produto_id, quantidade, preco_unitario, subtotal)
        VALUES (?, ?, ?, ?, ?)
    `;

        const values = [
            venda_id,
            produto_id,
            quantidade,
            preco_unitario,
            subtotal
        ];

        try {
            const [resultado] = await db.execute(sql, values);
            return resultado;
        } catch (erro) {
            console.log("Erro ao cadastrar item da venda:");
            console.log(erro.message);
            throw erro;
        }
    }

    static async listarPorVenda(venda_id) {
        const sql = `
            SELECT *
            FROM item_venda
            WHERE venda_id = ?
        `;

        const values = [venda_id];

        try {
            const [resultados] = await db.execute(sql, values);
            return resultados;
        } catch (erro) {
            console.log("Erro ao listar itens da venda:");
            console.log(erro.message);
            throw erro;
        }
    }

    static async editar(id, quantidade, preco_unitario) {
        const sql = `
            UPDATE item_venda
            SET
                quantidade = ?,
                preco_unitario = ?,
                subtotal = ?
            WHERE id = ?
        `;

        const values = [
            quantidade,
            preco_unitario,
            quantidade * preco_unitario,
            id
        ];

        try {
            const [resultado] = await db.execute(sql, values);
            return resultado;
        } catch (erro) {
            console.log("Erro ao editar item da venda:");
            console.log(erro.message);
            throw erro;
        }
    }

    static async excluir(id) {
        const sql = `
            DELETE FROM item_venda
            WHERE id = ?
        `;

        const values = [id];

        try {
            const [resultado] = await db.execute(sql, values);
            return resultado;
        } catch (erro) {
            console.log("Erro ao excluir item da venda:");
            console.log(erro.message);
            throw erro;
        }
    }

    static async excluirPorVenda(venda_id) {
        const sql = `
            DELETE FROM item_venda
            WHERE venda_id = ?
        `;

        const values = [venda_id];

        try {
            const [resultado] = await db.execute(sql, values);
            return resultado;
        } catch (erro) {
            console.log("Erro ao excluir itens da venda:");
            console.log(erro.message);
            throw erro;
        }
    }
}

module.exports = ItemVenda;