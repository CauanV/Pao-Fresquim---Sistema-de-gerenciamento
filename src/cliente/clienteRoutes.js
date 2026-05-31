const express = require('express');
const router = express.Router();
const clienteController = require('./clienteController');

router.post('/', clienteController.cadastrar);
router.get('/nome', clienteController.buscarPorNome);
router.get('/cpf/:cpf', clienteController.buscarPorCpf);
router.get('/:id', clienteController.buscarPorId);
router.get('/', clienteController.listar);
router.put('/:id', clienteController.editarPorId);
router.delete('/:id', clienteController.excluirPorId);

module.exports = router;