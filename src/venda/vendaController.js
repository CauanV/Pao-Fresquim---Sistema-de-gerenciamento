// vendaController.js

const VendaModel = require("./vendaModel");
const ItemVenda = require("./ItemVenda");

class VendaController {

    static async cadastrar(req, res) {
        try {
            const {
                cliente_id,
                funcionario_id,
                data_venda,
                valor_total,
                forma_pagamento,
                itens
            } = req.body;

            if (!valor_total || !data_venda || !forma_pagamento) {
                return res.status(400).json({
                    sucesso: false,
                    message: 'Campos obrigatórios faltando'
                });
            }

            const resultado = await VendaModel.cadastrar(
                cliente_id || null,
                funcionario_id || null,
                data_venda,
                valor_total,
                forma_pagamento
            );

            const venda_id = resultado.insertId;

            if (itens && Array.isArray(itens)) {
                for (const item of itens) {
                    await ItemVenda.cadastrar(
                        venda_id,
                        item.produto_id,
                        item.quantidade,
                        item.preco_unitario
                    );
                }
            }

            return res.status(201).json({
                sucesso: true,
                message: "Venda cadastrada com sucesso!",
                id: venda_id
            });

        } catch (erro) {
            console.log("ERRO ao cadastrar venda:", erro);
            return res.status(500).json({
                sucesso: false,
                message: "Erro ao cadastrar venda: " + erro.message
            });
        }
    }

    static async listar(req, res) {
        try {
            const id = req.params.id || null;

            const resultados = await VendaModel.listar(id);

            return res.status(200).json({
                sucesso: true,
                data: resultados
            });

        } catch (erro) {
            console.log(erro);
            return res.status(500).json({
                sucesso: false,
                message: "Erro ao listar vendas"
            });
        }
    }

    static async editarPorId(req, res) {
        try {
            const id = req.params.id;

            const {
                cliente_id,
                valor_total,
                data_venda
            } = req.body;

            const resultado = await VendaModel.editarPorId(
                id,
                cliente_id,
                valor_total,
                data_venda
            );

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Venda não encontrada'
                });
            }

            return res.status(200).json({
                sucesso: true,
                message: "Venda editada com sucesso!"
            });

        } catch (erro) {
            console.log(erro);
            return res.status(500).json({
                sucesso: false,
                message: "Erro ao editar venda"
            });
        }
    }

    static async excluirPorId(req, res) {
        try {
            const id = req.params.id;

            const resultado = await VendaModel.excluirPorId(id);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Venda não encontrada'
                });
            }

            return res.status(200).json({
                sucesso: true,
                message: "Venda excluída com sucesso!"
            });

        } catch (erro) {
            console.log(erro);
            return res.status(500).json({
                sucesso: false,
                message: "Erro ao excluir venda"
            });
        }
    }
}

module.exports = VendaController;