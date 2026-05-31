const db = require("../db/db.js");

class FiadoController {

    static async listarFiados(req, res) {
        try {
            const sql = `
                SELECT 
                    v.id as venda_id,
                    c.id as cliente_id,
                    c.nome as cliente_nome,
                    v.valor_total as total_devido,
                    v.data_venda as ultima_compra
                FROM vendas v
                LEFT JOIN clientes c ON v.cliente_id = c.id
                WHERE v.forma_pagamento = 'Fiado' AND c.id IS NOT NULL
                ORDER BY v.data_venda DESC
            `;

            const [resultados] = await db.execute(sql);

            return res.status(200).json({
                sucesso: true,
                data: resultados
            });

        } catch (erro) {
            console.log(erro);
            return res.status(500).json({
                sucesso: false,
                message: "Erro ao listar contas fiado"
            });
        }
    }

    static async detalhesClienteFiado(req, res) {
        try {
            const { cliente_id: venda_id } = req.params;

            if (!venda_id) {
                return res.status(400).json({
                    sucesso: false,
                    message: "Venda ID é obrigatório"
                });
            }

            const sql = `
                SELECT 
                    v.id as venda_id,
                    v.data_venda,
                    p.nome as produto,
                    iv.quantidade,
                    iv.preco_unitario,
                    iv.subtotal,
                    v.valor_total
                FROM vendas v
                LEFT JOIN item_venda iv ON v.id = iv.venda_id
                LEFT JOIN produtos p ON iv.produto_id = p.id
                WHERE v.id = ? AND v.forma_pagamento = 'Fiado'
                ORDER BY v.data_venda DESC
            `;

            const [resultados] = await db.execute(sql, [venda_id]);

            return res.status(200).json({
                sucesso: true,
                data: resultados
            });

        } catch (erro) {
            console.log(erro);
            return res.status(500).json({
                sucesso: false,
                message: "Erro ao buscar detalhes da venda"
            });
        }
    }
}

module.exports = FiadoController;