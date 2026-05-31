const db = require("../db/db.js");

class RelatorioController {

    static async relatorioVendas(req, res) {

        try {
            const { dataInicio, dataFim, produto, pagamento } = req.body;
            let sql = `
                SELECT 
                    v.id,
                    v.data_venda,
                    v.forma_pagamento,
                    v.valor_total,
                    p.nome AS produto,
                    iv.quantidade
                FROM vendas v
                JOIN item_venda iv ON iv.venda_id = v.id
                JOIN produtos p ON p.id = iv.produto_id
                WHERE 1=1
            `;

            const params = [];

            if (dataInicio) {
                sql += " AND v.data_venda >= ?";
                params.push(dataInicio);
            }

            if (dataFim) {
                sql += " AND v.data_venda <= ?";
                params.push(dataFim);
            }

            if (produto && produto !== 'Todos') {
                sql += " AND p.nome = ?";
                params.push(produto);
            }

            if (pagamento && pagamento !== 'Todas') {
                sql += " AND v.forma_pagamento = ?";
                params.push(pagamento);
            }

            const [result] = await db.execute(sql, params);

            return res.json(result);

        } catch (err) {
            return res.status(500).json({ erro: err.message });
        }
    }
}

module.exports = RelatorioController;