const express = require("express");
const router = express.Router();

const relatorioController = require("./relatorioController");

router.post("/vendas", relatorioController.relatorioVendas);

module.exports = router;