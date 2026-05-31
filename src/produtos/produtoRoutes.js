const express = require('express');
const router = express.Router();
const ProdutoController = require('./produtoController');

router.post('/', ProdutoController.cadastrar);
router.get('/nome', ProdutoController.buscarPorNome);
router.get('/codigo/:codigoBarras', ProdutoController.buscarPorCodigoBarras);
router.get('/:id', ProdutoController.buscarPorId);
router.get('/', ProdutoController.listar);
router.put('/:id', ProdutoController.editarPorId);
router.delete('/:id', ProdutoController.excluirPorId);

module.exports = router;