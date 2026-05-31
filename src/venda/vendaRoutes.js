const express = require('express');
const router = express.Router();
const VendaController = require('./vendaController');

router.post('/', VendaController.cadastrar);
router.get('/:id', VendaController.listar);
router.get('/', VendaController.listar);
router.put('/:id', VendaController.editarPorId);
router.delete('/:id', VendaController.excluirPorId);

module.exports = router;