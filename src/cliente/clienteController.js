const ClienteModel = require('./clienteModel');

class ClienteController {

    static async cadastrar(req, res) {
        try {
            const { nome, telefone, endereco, cpf, email } = req.body;// Extrai os dados do corpo da requisição

            if (!nome || !cpf || !email) {
                return res.status(400).json({ sucesso: false, message: "Campos obrigatórios faltando" });
            }

            const resultado = await ClienteModel.cadastrar(nome, telefone, endereco, cpf, email);

            return res.status(201).json({
                sucesso: true,
                message: 'Cliente cadastrado com sucesso!',
                id: resultado.insertId
            });
        } catch (erro) {
            console.log(erro.message);
            return res.status(500).json({
                sucesso: false,
                message: 'Não foi possível realizar o cadastro no momento.'
            });
        }
    }



    static async listar(req, res) {
        try {
            const clientes = await ClienteModel.listar();
            return res.status(200).json({
                sucesso: true,
                data: clientes
            });
        } catch (erro) {
            console.log(erro);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao listar clientes'
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const cliente = await ClienteModel.buscarPorId(id);

            if (!cliente) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Cliente não encontrado'
                });
            }

            return res.status(200).json({
                sucesso: true,
                data: cliente
            });
        } catch (erro) {
            console.log(erro);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao buscar cliente'
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

            const clientes = await ClienteModel.buscarPorNome(nome);
            return res.status(200).json({
                sucesso: true,
                data: clientes
            });
        } catch (erro) {
            console.log(erro);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao buscar clientes'
            });
        }
    }

    static async buscarPorCpf(req, res) {
        try {
            const { cpf } = req.params;

            if (!cpf) {
                return res.status(400).json({
                    sucesso: false,
                    message: 'CPF é obrigatório'
                });
            }

            const cliente = await ClienteModel.buscarPorCpf(cpf);

            if (!cliente) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Cliente não encontrado'
                });
            }

            return res.status(200).json({
                sucesso: true,
                data: cliente
            });
        } catch (erro) {
            console.log(erro);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao buscar cliente'
            });
        }
    }



    static async editarPorId(req, res) {
        try {
            const { id } = req.params;
            const { nome, telefone, endereco, cpf, email } = req.body;

            const resultado = await ClienteModel.editarPorId(id, nome, telefone, endereco, cpf, email);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Cliente não encontrado'
                });
            }

            return res.status(200).json({
                sucesso: true,
                message: 'Cliente atualizado com sucesso'
            });

        } catch (erro) {
            console.log(erro);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao editar cliente'
            });
        }
    }

    static async excluirPorId(req, res) {
        try {
            const { id } = req.params;
            const resultado = await ClienteModel.excluirPorId(id);

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Cliente não encontrado'
                });
            }

            return res.status(200).json({
                sucesso: true,
                message: 'Cliente excluído com sucesso'
            });
        } catch (erro) {
            console.log(erro);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao excluir cliente'
            });
        }
    }

}
module.exports = ClienteController;