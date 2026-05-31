# Pão Fresquim 🥖

Sistema de gerenciamento para padaria com funcionalidades de vendas, clientes, funcionários, produtos e relatórios.

## Funcionalidades

- ✅ Gerenciamento de Clientes
- ✅ Gerenciamento de Produtos
- ✅ Registro de Vendas
- ✅ Gerenciamento de Funcionários
- ✅ Sistema de Fiado (Compras a Crédito)
- ✅ Relatórios de Vendas

## Pré-requisitos

- Node.js (v14 ou superior)
- MySQL (v5.7 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório
```bash
git clone <seu-repositorio>
cd pao-fresquim
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais do banco de dados:
```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=db_pao_fresquim
DB_PORT=3306
```

4. Inicie o servidor
```bash
npm start
```

O servidor rodará na porta **3000**.

## Estrutura do Projeto

```
src/
├── db/              # Configuração do banco de dados
├── cliente/         # Módulo de clientes
├── produtos/        # Módulo de produtos
├── funcionario/     # Módulo de funcionários
├── venda/           # Módulo de vendas
├── fiado/           # Módulo de compras a crédito
├── relatorios/      # Módulo de relatórios
└── server.js        # Arquivo principal do servidor
```

## API Endpoints

### Clientes
- `POST /clientes` - Criar cliente
- `GET /clientes` - Listar todos os clientes
- `GET /clientes/:id` - Buscar cliente por ID
- `GET /clientes/nome` - Buscar cliente por nome
- `GET /clientes/cpf/:cpf` - Buscar cliente por CPF
- `PUT /clientes/:id` - Atualizar cliente
- `DELETE /clientes/:id` - Deletar cliente

### Produtos
- `POST /produtos` - Criar produto
- `GET /produtos` - Listar todos os produtos
- `GET /produtos/:id` - Buscar produto por ID
- `GET /produtos/nome` - Buscar produto por nome
- `GET /produtos/codigo/:codigoBarras` - Buscar por código de barras
- `PUT /produtos/:id` - Atualizar produto
- `DELETE /produtos/:id` - Deletar produto

### Vendas
- `POST /vendas` - Criar venda
- `GET /vendas` - Listar todas as vendas
- `GET /vendas/:id` - Buscar venda por ID
- `PUT /vendas/:id` - Atualizar venda
- `DELETE /vendas/:id` - Deletar venda

### Funcionários
- `POST /funcionarios` - Criar funcionário
- `GET /funcionarios` - Listar todos os funcionários
- `GET /funcionarios/:id` - Buscar funcionário por ID
- `GET /funcionarios/nome` - Buscar funcionário por nome
- `GET /funcionarios/cpf/:cpf` - Buscar funcionário por CPF
- `PUT /funcionarios/:id` - Atualizar funcionário
- `DELETE /funcionarios/:id` - Deletar funcionário

### Fiado
- `GET /fiado` - Listar todas as contas fiado
- `GET /fiado/:cliente_id` - Detalhes da conta fiado

### Relatórios
- `POST /relatorios/vendas` - Gerar relatório de vendas

## Tecnologias

- **Express.js** - Framework web
- **MySQL2** - Driver MySQL
- **CORS** - Compartilhamento de recursos entre domínios
- **dotenv** - Gerenciamento de variáveis de ambiente
- **Node.js**

## Autor

Cauan Vicktor

## Licença

ISC


<img width="1918" height="927" alt="image (2) (1)" src="https://github.com/user-attachments/assets/c2033d6b-95f8-49b2-a8b8-c1eaaa3ef372" />



<img width="1918" height="927" alt="image (6) (1)" src="https://github.com/user-attachments/assets/d7dfc8a0-cc17-4bda-a874-8153d80b96a7" />

