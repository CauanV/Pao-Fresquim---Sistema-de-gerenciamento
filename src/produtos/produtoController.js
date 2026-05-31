const ProdutoModel = require('./produtoModel');

class ProdutoController {

    static async cadastrar(req, res) {
        try {
            const { nome, preco, codigoBarras, unidade } = req.body;

            if (!nome || !preco || !unidade) {
                return res.status(400).json({
                    sucesso: false,
                    message: 'Nome, preço e unidade são obrigatórios'
                });
            }

            const resultado = await ProdutoModel.cadastrar(nome, preco, codigoBarras, unidade);

            return res.status(201).json({
                sucesso: true,
                message: 'Produto cadastrado com sucesso',
                id: resultado.insertId
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao cadastrar produto'
            });
        }
    }

    static async listar(req, res) {
        try {
            const produtos = await ProdutoModel.listar();
            return res.status(200).json({
                sucesso: true,
                data: produtos
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao listar produtos'
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const produto = await ProdutoModel.buscarPorId(id);

            if (!produto) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Produto não encontrado'
                });
            }

            return res.status(200).json({
                sucesso: true,
                data: produto
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao buscar produto'
            });
        }
    }

    static async buscarPorNome(req, res) {
        try {
            const { nome } = req.query;

            if (!nome) {
                return res.status(400).json({
                    sucesso: false,
                    message: 'Nome é obrigatório'
                });
            }

            const produtos = await ProdutoModel.buscarPorNome(nome);
            return res.status(200).json({
                sucesso: true,
                data: produtos
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao buscar produtos'
            });
        }
    }

    static async buscarPorCodigoBarras(req, res) {
        try {
            const { codigoBarras } = req.params;

            if (!codigoBarras) {
                return res.status(400).json({
                    sucesso: false,
                    message: 'Código de barras é obrigatório'
                });
            }

            const produto = await ProdutoModel.buscarPorCodigoBarras(codigoBarras);

            if (!produto) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Produto não encontrado'
                });
            }

            return res.status(200).json({
                sucesso: true,
                data: produto
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao buscar produto'
            });
        }
    }

    static async editarPorId(req, res) {
        try {
            const { id } = req.params;
            const { nome, preco, codigoBarras, unidade } = req.body;

            if (!nome || !preco || !unidade) {
                return res.status(400).json({
                    sucesso: false,
                    message: 'Nome, preço e unidade são obrigatórios'
                });
            }

            const resultado = await ProdutoModel.editarPorId(id, nome, preco, codigoBarras, unidade);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Produto não encontrado'
                });
            }

            return res.status(200).json({
                sucesso: true,
                message: 'Produto atualizado com sucesso'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao editar produto'
            });
        }
    }

    static async excluirPorId(req, res) {
        try {
            const { id } = req.params;
            const resultado = await ProdutoModel.excluirPorId(id);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Produto não encontrado'
                });
            }

            return res.status(200).json({
                sucesso: true,
                message: 'Produto excluído com sucesso'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao excluir produto'
            });
        }
    }
}

module.exports = ProdutoController;