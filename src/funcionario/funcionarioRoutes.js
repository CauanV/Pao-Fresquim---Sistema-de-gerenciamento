const express = require('express');
const router = express.Router();
const funcionarioController = require('./funcionarioController');

router.post('/', funcionarioController.cadastrar);
router.get('/cpf/:cpf', funcionarioController.buscarPorCpf);
router.get('/nome', funcionarioController.buscarPorNome);
router.get('/:id', funcionarioController.buscarPorId);
router.get('/', funcionarioController.listar);
router.put('/:id', funcionarioController.editarPorId);
router.delete('/:id', funcionarioController.excluirPorId);

module.exports = router;