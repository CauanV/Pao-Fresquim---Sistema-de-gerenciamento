//express transforma o node em um servidor web, cors é para permitir que o frontend acesse a api.
const express = require("express");
const cors = require("cors");

const Cliente = require("./cliente/clienteRoutes.js");
const Funcionario = require("./funcionario/funcionarioRoutes.js");
const Produtos = require("./produtos/produtoRoutes.js");
const Venda = require("./venda/vendaRoutes.js");
const Relatorio = require("./relatorios/relatorioRoutes.js");
const Fiado = require("./fiado/fiadoRoutes.js");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


app.use("/clientes", Cliente);
app.use("/funcionarios", Funcionario);
app.use("/produtos", Produtos);
app.use("/vendas", Venda);
app.use("/relatorios", Relatorio);
app.use("/fiado", Fiado);


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});