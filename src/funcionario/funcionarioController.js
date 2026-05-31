const FuncionarioModel = require('./funcionarioModel');

class FuncionarioController {

    static async cadastrar(req, res) {
        try {
            const { nome, endereco, telefone_pessoal, telefone_emergencial, data_admissao, cargo } = req.body;

            if (!nome || !cargo || !data_admissao || !telefone_pessoal || !telefone_emergencial || !endereco) {
                return res.status(400).json({
                    sucesso: false,
                    message: 'Campos obrigatórios faltando'
                });
            }

            const resultado = await FuncionarioModel.cadastrar(nome, endereco, telefone_pessoal, telefone_emergencial, data_admissao, cargo);

            return res.status(201).json({
                sucesso: true,
                message: 'Funcionário cadastrado com sucesso',
                id: resultado.insertId
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao cadastrar funcionário'
            });
        }
    }

    static async listar(req, res) {
        try {
            const funcionarios = await FuncionarioModel.listar();
            return res.status(200).json({
                sucesso: true,
                data: funcionarios
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao listar funcionários'
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const funcionario = await FuncionarioModel.buscarPorId(id);
            if (!funcionario) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Funcionário não encontrado'
                });
            }
            return res.status(200).json({
                sucesso: true,
                data: funcionario
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao buscar funcionário'
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

            const funcionarios = await FuncionarioModel.buscarPorNome(nome);
            return res.status(200).json({
                sucesso: true,
                data: funcionarios
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao buscar funcionários'
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

            const funcionario = await FuncionarioModel.buscarPorCpf(cpf);
            if (!funcionario) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Funcionário não encontrado'
                });
            }
            return res.status(200).json({
                sucesso: true,
                data: funcionario
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao buscar funcionário'
            });
        }
    }

    static async editarPorId(req, res) {
        try {
            const { id } = req.params;
            const { nome, endereco, telefone_pessoal, telefone_emergencial, data_admissao, cargo } = req.body;

            const resultado = await FuncionarioModel.editarPorId(id, nome, endereco, telefone_pessoal, telefone_emergencial, data_admissao, cargo);
            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Funcionário não encontrado'
                });
            }
            return res.status(200).json({
                sucesso: true,
                message: 'Funcionário atualizado com sucesso'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao atualizar funcionário'
            });
        }
    }

    static async excluirPorId(req, res) {
        try {
            const { id } = req.params;
            const resultado = await FuncionarioModel.excluirPorId(id);
            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    sucesso: false,
                    message: 'Funcionário não encontrado'
                });
            }
            return res.status(200).json({
                sucesso: true,
                message: 'Funcionário excluído com sucesso'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                sucesso: false,
                message: 'Erro ao excluir funcionário'
            });
        }
    }

}

module.exports = FuncionarioController;