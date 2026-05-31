const express = require('express');
const router = express.Router();
const FiadoController = require('./fiadoController');

router.get('/', FiadoController.listarFiados);
router.get('/:cliente_id', FiadoController.detalhesClienteFiado);

module.exports = router;
