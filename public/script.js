// Função para mostrar a tela selecionada
function mostrarTela(id, event) {
  // Ocultar todas as telas
  const telas = document.querySelectorAll('.tela');
  telas.forEach(function (tela) {
    tela.classList.remove('ativa');
  });

  // Mostrar tela selecionada
  const telaSelecionada = document.getElementById(id);
  if (telaSelecionada) {
    telaSelecionada.classList.add('ativa');
  }

  // Atualizar botões de navegação
  const botoes = document.querySelectorAll('.nav-btn');
  botoes.forEach(function (botao) {
    botao.classList.remove('active');
  });

  // Marcar botão como ativo
  if (event && event.target) {
    event.target.classList.add('active');
  }

  // Carregar dados específicos ao abrir abas
  if (id === 'fiado') {
    listarFiadosClientes();
  }
}

// EDITED BY ARTHUR NOGUEIRA - Função global de modal de confirmação
function confirmarAcao(mensagem, titulo, icone, callback) {
  const modal = document.getElementById('modalConfirmacao');
  document.getElementById('modalConfirmacaoMensagem').textContent = mensagem;
  document.getElementById('modalConfirmacaoTitulo').textContent = titulo || 'Confirmar ação';
  document.getElementById('modalConfirmacaoIcone').textContent = icone || '⚠️';
  modal.style.display = 'flex';

  const btnConfirmar = document.getElementById('modalConfirmacaoConfirmar');
  const btnCancelar = document.getElementById('modalConfirmacaoCancelar');

  const novoConfirmar = btnConfirmar.cloneNode(true);
  const novoCancelar = btnCancelar.cloneNode(true);
  btnConfirmar.parentNode.replaceChild(novoConfirmar, btnConfirmar);
  btnCancelar.parentNode.replaceChild(novoCancelar, btnCancelar);

  novoConfirmar.addEventListener('click', function () {
    modal.style.display = 'none';
    callback();
  });
  novoCancelar.addEventListener('click', function () {
    modal.style.display = 'none';
  });
}
// END EDITED BY ARTHUR NOGUEIRA

// EDITED BY ARTHUR NOGUEIRA - Funções de máscara
function mascaraCPF(input) {
  let v = input.value.replace(/\D/g, '');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  input.value = v;
}

function mascaraTelefone(input) {
  let v = input.value.replace(/\D/g, '');
  v = v.replace(/^(\d{2})(\d)/, '($1) $2');
  v = v.replace(/(\d{5})(\d{1,4})$/, '$1-$2');
  input.value = v;
}

function removerMascara(valor) {
  return valor.replace(/\D/g, '');
}
// END EDITED BY ARTHUR NOGUEIRA

// EDITED BY ARTHUR NOGUEIRA - Funções de validação de formato
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarCPF(cpf) {
  return removerMascara(cpf).length === 11;
}

function validarTelefone(tel) {
  return removerMascara(tel).length >= 10;
}

function marcarErro(idCampo, mensagem) {
  const input = document.getElementById(idCampo);
  if (!input) return;
  input.classList.add('campo-erro');
  const label = input.closest('.form-group') && input.closest('.form-group').querySelector('label');
  if (label) label.classList.add('label-erro');
  let msg = input.parentNode.querySelector('.msg-erro-campo');
  if (!msg) {
    msg = document.createElement('span');
    msg.className = 'msg-erro-campo';
    input.parentNode.appendChild(msg);
  }
  msg.textContent = mensagem;
}

function limparErros(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.querySelectorAll('.campo-erro').forEach(el => el.classList.remove('campo-erro'));
  form.querySelectorAll('.label-erro').forEach(el => el.classList.remove('label-erro'));
  form.querySelectorAll('.msg-erro-campo').forEach(el => el.remove());
}
// END EDITED BY ARTHUR NOGUEIRA

// EDITED BY ARTHUR NOGUEIRA - Funções de loading no botão
function ativarLoading(btn, texto) {
  btn.dataset.textoOriginal = btn.textContent;
  btn.textContent = texto || 'Aguarde...';
  btn.classList.add('btn-loading');
}

function desativarLoading(btn) {
  btn.textContent = btn.dataset.textoOriginal || btn.textContent;
  btn.classList.remove('btn-loading');
}
// END EDITED BY ARTHUR NOGUEIRA

// EDITED BY ARTHUR NOGUEIRA - Navegação por teclado nos botões do nav (setas + Enter)
document.addEventListener('DOMContentLoaded', function () {
  const navBtns = Array.from(document.querySelectorAll('.nav-btn'));

  navBtns.forEach(function (btn) {
    btn.addEventListener('keydown', function (e) {
      const atual = navBtns.indexOf(btn);
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const proximo = navBtns[atual + 1] || navBtns[0];
        proximo.focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const anterior = navBtns[atual - 1] || navBtns[navBtns.length - 1];
        anterior.focus();
      }
    });
  });

  // Itens do menu grid continuam com Enter
  const itens = Array.from(document.querySelectorAll('.menu-item'));
  itens.forEach(function (item) {
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        item.click();
      }
    });
  });
});
// END EDITED BY ARTHUR NOGUEIRA


function mostrarMensagem(tipo, mensagem) {
  const msgElement = document.createElement('div');
  msgElement.className = `mensagem ${tipo}`;
  msgElement.textContent = mensagem;
  msgElement.style.cssText = `
    padding: 10px 15px;
    margin: 10px 0;
    border-radius: 4px;
    background-color: ${tipo === 'sucesso' ? '#d4edda' : '#f8d7da'};
    color: ${tipo === 'sucesso' ? '#155724' : '#721c24'};
    border: 1px solid ${tipo === 'sucesso' ? '#c3e6cb' : '#f5c6cb'};
  `;

  const container = document.querySelector('main') || document.body;
  container.insertBefore(msgElement, container.firstChild);

  setTimeout(() => msgElement.remove(), 3000);
}

// Função para limpar formulário
function limparFormulario(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();
  }
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
  console.log('Protótipo Pão FresQUIM carregado com sucesso!');
  listarClientes();
  listarProdutos();
  listarFuncionarios();
  listarVendas();
  carregarFuncionariosVenda();
  listarFiadosClientes();
  carregarProdutosRelatorio();
});

// ==================== CLIENTES ====================

function salvarCliente() {
  // EDITED BY ARTHUR NOGUEIRA - limpar erros anteriores
  limparErros('formCliente');

  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const email = document.getElementById('email').value.trim();

  // EDITED BY ARTHUR NOGUEIRA - validações com destaque de campo
  let temErro = false;
  if (!nome) { marcarErro('nome', 'Nome é obrigatório'); temErro = true; }
  if (!cpf) { marcarErro('cpf', 'CPF é obrigatório'); temErro = true; }
  else if (!validarCPF(cpf)) { marcarErro('cpf', 'CPF inválido (ex: 000.000.000-00)'); temErro = true; }
  if (!email) { marcarErro('email', 'Email é obrigatório'); temErro = true; }
  else if (!validarEmail(email)) { marcarErro('email', 'Email inválido'); temErro = true; }
  if (telefone && !validarTelefone(telefone)) { marcarErro('telefone', 'Telefone inválido'); temErro = true; }
  if (temErro) return;
  // END EDITED BY ARTHUR NOGUEIRA

  const dados = {
    nome: nome,
    telefone: removerMascara(telefone), // EDITED BY ARTHUR NOGUEIRA - remove máscara antes de enviar
    endereco: endereco,
    cpf: removerMascara(cpf), // EDITED BY ARTHUR NOGUEIRA - remove máscara antes de enviar
    email: email
  };

  // EDITED BY ARTHUR NOGUEIRA - Confirmação antes de salvar cliente
  confirmarAcao('Deseja salvar o cliente ' + nome + '?', 'Salvar Cliente', '💾', function () {
  // EDITED BY ARTHUR NOGUEIRA - loading no botão
  const btn = document.querySelector('button[onclick="salvarCliente()"]');
  if (btn) ativarLoading(btn, 'Salvando...');
  fetch("http://localhost:3000/clientes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
    .then(res => res.json())
    .then(resposta => {
      if (btn) desativarLoading(btn); // EDITED BY ARTHUR NOGUEIRA
      if (resposta.sucesso) {
        mostrarMensagem('sucesso', 'Cliente cadastrado com sucesso!');
        limparFormulario('formCliente');
        listarClientes();
      } else {
        mostrarMensagem('erro', resposta.message || 'Erro ao cadastrar cliente');
      }
    })
    .catch(erro => {
      if (btn) desativarLoading(btn); // EDITED BY ARTHUR NOGUEIRA
      console.log("Erro:", erro);
      mostrarMensagem('erro', 'Erro na comunicação com o servidor');
    });
  }); // END EDITED BY ARTHUR NOGUEIRA
}

function listarClientes() {
  fetch("http://localhost:3000/clientes")
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso && Array.isArray(resposta.data)) {
        exibirClientesTabela(resposta.data);
      }
    })
    .catch(erro => {
      console.log("Erro ao listar clientes:", erro);
    });
}

function exibirClientesTabela(clientes) {
  const container = document.getElementById('listaClientes');
  if (!container) return;

  if (clientes.length === 0) {
    container.innerHTML = '<p>Nenhum cliente cadastrado</p>';
    return;
  }

  let html = '<table style="width: 100%; border-collapse: collapse;">';
  html += '<thead><tr><th>ID</th><th>Nome</th><th>CPF</th><th>Email</th><th>Ações</th></tr></thead><tbody>';

  clientes.forEach(cliente => {
    html += `<tr style="border-bottom: 1px solid #ddd;">
      <td>${cliente.id}</td>
      <td>${cliente.nome}</td>
      <td>${cliente.cpf}</td>
      <td>${cliente.email}</td>
      <td>
        <button class="btn-table btn-table-editar" onclick="editarCliente(${cliente.id})">Editar</button>
        <button class="btn-table btn-table-excluir" onclick="excluirCliente(${cliente.id})">Excluir</button>
      </td>
    </tr>`;
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

function editarCliente(id) {
  fetch(`http://localhost:3000/clientes/${id}`)
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso) {
        const cliente = resposta.data;
        document.getElementById('nome').value = cliente.nome;
        document.getElementById('telefone').value = cliente.telefone;
        document.getElementById('endereco').value = cliente.endereco;
        document.getElementById('cpf').value = cliente.cpf;
        document.getElementById('email').value = cliente.email;

        // Trocar botão de salvar para atualizar
        const botao = document.querySelector('button[onclick="salvarCliente()"]');
        if (botao) {
          botao.textContent = 'Atualizar Cliente';
          botao.onclick = () => atualizarCliente(id);
        }
      }
    })
    .catch(erro => console.log("Erro:", erro));
}

function atualizarCliente(id) {
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const endereco = document.getElementById('endereco').value.trim();
  const cpf = document.getElementById('cpf').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!nome || !cpf || !email) {
    mostrarMensagem('erro', 'Nome, CPF e Email são obrigatórios!');
    return;
  }

  const dados = {
    nome, telefone, endereco, cpf, email
  };

  fetch(`http://localhost:3000/clientes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso) {
        mostrarMensagem('sucesso', 'Cliente atualizado com sucesso!');
        limparFormulario('formCliente');
        listarClientes();

        // Restaurar botão
        const botao = document.querySelector('button[onclick*="atualizarCliente"]');
        if (botao) {
          botao.textContent = 'Salvar Cliente';
          botao.onclick = () => salvarCliente();
        }
      }
    })
    .catch(erro => {
      console.log("Erro:", erro);
      mostrarMensagem('erro', 'Erro ao atualizar cliente');
    });
}

function excluirCliente(id) {
  // EDITED BY ARTHUR NOGUEIRA - Substituído confirm() nativo pelo modal de confirmação
  confirmarAcao('Tem certeza que deseja excluir este cliente?', 'Excluir Cliente', '🗑️', function () {
    fetch(`http://localhost:3000/clientes/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(resposta => {
        if (resposta.sucesso) {
          mostrarMensagem('sucesso', 'Cliente excluído com sucesso!');
          listarClientes();
        }
      })
      .catch(erro => {
        console.log("Erro:", erro);
        mostrarMensagem('erro', 'Erro ao excluir cliente');
      });
  }); // END EDITED BY ARTHUR NOGUEIRA
}

// ==================== PRODUTOS ====================

function salvarProduto() {
  // EDITED BY ARTHUR NOGUEIRA - limpar erros anteriores
  limparErros('formProduto');

  const nome = document.getElementById('nomeProduto').value.trim();
  const preco = document.getElementById('precoProduto').value.trim();
  const codigoBarras = document.getElementById('codigoBarrasProduto').value.trim();
  const unidade = document.getElementById('unidadeProduto').value.trim();

  // EDITED BY ARTHUR NOGUEIRA - validações com destaque de campo
  let temErro = false;
  if (!nome) { marcarErro('nomeProduto', 'Nome é obrigatório'); temErro = true; }
  if (!preco) { marcarErro('precoProduto', 'Preço é obrigatório'); temErro = true; }
  else if (parseFloat(preco) <= 0) { marcarErro('precoProduto', 'Preço deve ser maior que zero'); temErro = true; }
  if (!unidade) { marcarErro('unidadeProduto', 'Unidade é obrigatória'); temErro = true; }
  if (temErro) return;
  // END EDITED BY ARTHUR NOGUEIRA

  const dados = {
    nome: nome,
    preco: parseFloat(preco),
    codigoBarras: codigoBarras,
    unidade: unidade
  };

  // EDITED BY ARTHUR NOGUEIRA - Confirmação antes de salvar produto
  confirmarAcao('Deseja salvar o produto ' + nome + '?', 'Salvar Produto', '💾', function () {
  // EDITED BY ARTHUR NOGUEIRA - loading no botão
  const btn = document.querySelector('button[onclick="salvarProduto()"]');
  if (btn) ativarLoading(btn, 'Salvando...');
  fetch("http://localhost:3000/produtos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
    .then(res => res.json())
    .then(resposta => {
      if (btn) desativarLoading(btn); // EDITED BY ARTHUR NOGUEIRA
      if (resposta.sucesso) {
        mostrarMensagem('sucesso', 'Produto cadastrado com sucesso!');
        limparFormulario('formProduto');
        listarProdutos();
      } else {
        mostrarMensagem('erro', resposta.message || 'Erro ao cadastrar produto');
      }
    })
    .catch(erro => {
      if (btn) desativarLoading(btn); // EDITED BY ARTHUR NOGUEIRA
      console.log("Erro:", erro);
      mostrarMensagem('erro', 'Erro na comunicação com o servidor');
    });
  }); // END EDITED BY ARTHUR NOGUEIRA
}

function listarProdutos() {
  fetch("http://localhost:3000/produtos")
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso && Array.isArray(resposta.data)) {
        exibirProdutosTabela(resposta.data);
      }
    })
    .catch(erro => {
      console.log("Erro ao listar produtos:", erro);
    });
}

function exibirProdutosTabela(produtos) {
  const container = document.getElementById('listaProdutos');
  if (!container) return;

  if (produtos.length === 0) {
    container.innerHTML = '<p>Nenhum produto cadastrado</p>';
    return;
  }

  let html = '<table style="width: 100%; border-collapse: collapse;">';
  html += '<thead><tr><th>ID</th><th>Nome</th><th>Preço</th><th>Código</th><th>Unidade</th><th>Ações</th></tr></thead><tbody>';

  produtos.forEach(produto => {
    html += `<tr style="border-bottom: 1px solid #ddd;">
      <td>${produto.id}</td>
      <td>${produto.nome}</td>
      <td>R$ ${parseFloat(produto.preco).toFixed(2)}</td>
      <td>${produto.codigo_barras || '-'}</td>
      <td>${produto.unidade}</td>
      <td>
        <button class="btn-table btn-table-editar" onclick="editarProduto(${produto.id})">Editar</button>
        <button class="btn-table btn-table-excluir" onclick="excluirProduto(${produto.id})">Excluir</button>
      </td>
    </tr>`;
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

function editarProduto(id) {
  fetch(`http://localhost:3000/produtos/${id}`)
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso) {
        const produto = resposta.data;
        document.getElementById('nomeProduto').value = produto.nome;
        document.getElementById('precoProduto').value = produto.preco;
        document.getElementById('codigoBarrasProduto').value = produto.codigo_barras || '';
        document.getElementById('unidadeProduto').value = produto.unidade;

        const botao = document.querySelector('button[onclick="salvarProduto()"]');
        if (botao) {
          botao.textContent = 'Atualizar Produto';
          botao.onclick = () => atualizarProduto(id);
        }
      }
    })
    .catch(erro => console.log("Erro:", erro));
}

function atualizarProduto(id) {
  const nome = document.getElementById('nomeProduto').value.trim();
  const preco = document.getElementById('precoProduto').value.trim();
  const codigoBarras = document.getElementById('codigoBarrasProduto').value.trim();
  const unidade = document.getElementById('unidadeProduto').value.trim();

  if (!nome || !preco || !unidade) {
    mostrarMensagem('erro', 'Nome, Preço e Unidade são obrigatórios!');
    return;
  }

  const dados = {
    nome, preco: parseFloat(preco), codigoBarras, unidade
  };

  fetch(`http://localhost:3000/produtos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso) {
        mostrarMensagem('sucesso', 'Produto atualizado com sucesso!');
        limparFormulario('formProduto');
        listarProdutos();

        const botao = document.querySelector('button[onclick*="atualizarProduto"]');
        if (botao) {
          botao.textContent = 'Salvar Produto';
          botao.onclick = () => salvarProduto();
        }
      }
    })
    .catch(erro => {
      console.log("Erro:", erro);
      mostrarMensagem('erro', 'Erro ao atualizar produto');
    });
}

function excluirProduto(id) {
  // EDITED BY ARTHUR NOGUEIRA - Substituído confirm() nativo pelo modal de confirmação
  confirmarAcao('Tem certeza que deseja excluir este produto?', 'Excluir Produto', '🗑️', function () {
    fetch(`http://localhost:3000/produtos/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(resposta => {
        if (resposta.sucesso) {
          mostrarMensagem('sucesso', 'Produto excluído com sucesso!');
          listarProdutos();
        }
      })
      .catch(erro => {
        console.log("Erro:", erro);
        mostrarMensagem('erro', 'Erro ao excluir produto');
      });
  }); // END EDITED BY ARTHUR NOGUEIRA
}

// ==================== FUNCIONÁRIOS ====================

function salvarFuncionario() {
  // EDITED BY ARTHUR NOGUEIRA - limpar erros anteriores
  limparErros('formFuncionario');

  const nome = document.getElementById('nomeFuncionario').value.trim();
  const cargo = document.getElementById('cargoFuncionario').value.trim();
  const data_admissao = document.getElementById('dataAdmissaoFuncionario').value.trim();
  const telefonePessoal = document.getElementById('telefonePessoalFuncionario').value.trim();
  const telefoneEmergencial = document.getElementById('telefoneEmergenciaFuncionario').value.trim();
  const endereco = document.getElementById('enderecoFuncionario').value.trim();

  console.log('Dados do formulário:', { nome, cargo, data_admissao, telefonePessoal, telefoneEmergencial, endereco });

  // EDITED BY ARTHUR NOGUEIRA - validações com destaque de campo
  let temErro = false;
  if (!nome) { marcarErro('nomeFuncionario', 'Nome é obrigatório'); temErro = true; }
  if (!cargo) { marcarErro('cargoFuncionario', 'Cargo é obrigatório'); temErro = true; }
  if (!data_admissao) { marcarErro('dataAdmissaoFuncionario', 'Data de admissão é obrigatória'); temErro = true; }
  if (!telefonePessoal) { marcarErro('telefonePessoalFuncionario', 'Telefone pessoal é obrigatório'); temErro = true; }
  else if (!validarTelefone(telefonePessoal)) { marcarErro('telefonePessoalFuncionario', 'Telefone inválido'); temErro = true; }
  if (!telefoneEmergencial) { marcarErro('telefoneEmergenciaFuncionario', 'Telefone de emergência é obrigatório'); temErro = true; }
  else if (!validarTelefone(telefoneEmergencial)) { marcarErro('telefoneEmergenciaFuncionario', 'Telefone inválido'); temErro = true; }
  if (!endereco) { marcarErro('enderecoFuncionario', 'Endereço é obrigatório'); temErro = true; }
  if (temErro) { console.log('Campos faltando!'); return; }
  // END EDITED BY ARTHUR NOGUEIRA

  const dados = {
    nome,
    endereco,
    telefone_pessoal: removerMascara(telefonePessoal), // EDITED BY ARTHUR NOGUEIRA - remove máscara
    telefone_emergencial: removerMascara(telefoneEmergencial), // EDITED BY ARTHUR NOGUEIRA - remove máscara
    data_admissao,
    cargo
  };

  console.log('Enviando dados:', dados);

  // EDITED BY ARTHUR NOGUEIRA - Confirmação antes de salvar funcionário
  confirmarAcao('Deseja salvar o funcionário ' + nome + '?', 'Salvar Funcionário', '💾', function () {
  // EDITED BY ARTHUR NOGUEIRA - loading no botão
  const btn = document.querySelector('button[onclick="salvarFuncionario()"]');
  if (btn) ativarLoading(btn, 'Salvando...');
  fetch("http://localhost:3000/funcionarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
    .then(res => res.json())
    .then(resposta => {
      if (btn) desativarLoading(btn); // EDITED BY ARTHUR NOGUEIRA
      console.log('Resposta do servidor:', resposta);
      if (resposta.sucesso) {
        mostrarMensagem('sucesso', 'Funcionário cadastrado com sucesso!');
        limparFormulario('formFuncionario');
        listarFuncionarios();
        carregarFuncionariosVenda();
      } else {
        mostrarMensagem('erro', resposta.message || 'Erro ao cadastrar funcionário');
      }
    })
    .catch(erro => {
      if (btn) desativarLoading(btn); // EDITED BY ARTHUR NOGUEIRA
      console.log("Erro:", erro);
      mostrarMensagem('erro', 'Erro na comunicação com o servidor');
    });
  }); // END EDITED BY ARTHUR NOGUEIRA
}

function listarFuncionarios() {
  fetch("http://localhost:3000/funcionarios")
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso && Array.isArray(resposta.data)) {
        exibirFuncionariosTabela(resposta.data);
      }
    })
    .catch(erro => {
      console.log("Erro ao listar funcionários:", erro);
    });
}

function exibirFuncionariosTabela(funcionarios) {
  const container = document.getElementById('listaFuncionarios');
  if (!container) return;

  if (funcionarios.length === 0) {
    container.innerHTML = '<p>Nenhum funcionário cadastrado</p>';
    return;
  }

  let html = '<table style="width: 100%; border-collapse: collapse;">';
  html += '<thead><tr><th>ID</th><th>Nome</th><th>Cargo</th><th>Telefone Pessoal</th><th>Telefone Emergencial</th><th>Ações</th></tr></thead><tbody>';

  funcionarios.forEach(func => {
    html += `<tr style="border-bottom: 1px solid #ddd;">
      <td>${func.id}</td>
      <td>${func.nome}</td>
      <td>${func.cargo}</td>
      <td>${func.telefone_pessoal}</td>
      <td>${func.telefone_emergencial}</td>
      <td>
        <button class="btn-table btn-table-editar" onclick="editarFuncionario(${func.id})">Editar</button>
        <button class="btn-table btn-table-excluir" onclick="excluirFuncionario(${func.id})">Excluir</button>
      </td>
    </tr>`;
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

function editarFuncionario(id) {
  fetch(`http://localhost:3000/funcionarios/${id}`)
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso) {
        const func = resposta.data;
        document.getElementById('nomeFuncionario').value = func.nome;
        document.getElementById('cargoFuncionario').value = func.cargo;
        document.getElementById('enderecoFuncionario').value = func.endereco;
        document.getElementById('telefonePessoalFuncionario').value = func.telefone_pessoal;
        document.getElementById('telefoneEmergenciaFuncionario').value = func.telefone_emergencial;
        document.getElementById('dataAdmissaoFuncionario').value = func.data_admissao;

        const botao = document.querySelector('button[onclick="salvarFuncionario()"]');
        if (botao) {
          botao.textContent = 'Atualizar Funcionário';
          botao.onclick = () => atualizarFuncionario(id);
        }
      }
    })
    .catch(erro => console.log("Erro:", erro));
}

function atualizarFuncionario(id) {
  const nome = document.getElementById('nomeFuncionario').value.trim();
  const cargo = document.getElementById('cargoFuncionario').value.trim();
  const endereco = document.getElementById('enderecoFuncionario').value.trim();
  const telefonePessoal = document.getElementById('telefonePessoalFuncionario').value.trim();
  const telefoneEmergencial = document.getElementById('telefoneEmergenciaFuncionario').value.trim();
  const dataAdmissao = document.getElementById('dataAdmissaoFuncionario').value.trim();

  if (!nome || !cargo || !endereco || !telefonePessoal || !telefoneEmergencial || !dataAdmissao) {
    mostrarMensagem('erro', 'Todos os campos são obrigatórios!');
    return;
  }

  const dados = {
    nome, cargo, endereco, telefone_pessoal: telefonePessoal, telefone_emergencial: telefoneEmergencial, data_admissao: dataAdmissao
  };

  fetch(`http://localhost:3000/funcionarios/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso) {
        mostrarMensagem('sucesso', 'Funcionário atualizado com sucesso!');
        limparFormulario('formFuncionario');
        listarFuncionarios();

        const botao = document.querySelector('button[onclick*="atualizarFuncionario"]');
        if (botao) {
          botao.textContent = 'Salvar Funcionário';
          botao.onclick = () => salvarFuncionario();
        }
      }
    })
    .catch(erro => {
      console.log("Erro:", erro);
      mostrarMensagem('erro', 'Erro ao atualizar funcionário');
    });
}

function excluirFuncionario(id) {
  // EDITED BY ARTHUR NOGUEIRA - Substituído confirm() nativo pelo modal de confirmação
  confirmarAcao('Tem certeza que deseja excluir este funcionário?', 'Excluir Funcionário', '🗑️', function () {
    fetch(`http://localhost:3000/funcionarios/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(resposta => {
        if (resposta.sucesso) {
          mostrarMensagem('sucesso', 'Funcionário excluído com sucesso!');
          listarFuncionarios();
        }
      })
      .catch(erro => {
        console.log("Erro:", erro);
        mostrarMensagem('erro', 'Erro ao excluir funcionário');
      });
  }); // END EDITED BY ARTHUR NOGUEIRA
}

// ==================== VENDAS ====================

let carrinhoItems = [];

function carregarFuncionariosVenda() {
  fetch("http://localhost:3000/funcionarios")
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso && Array.isArray(resposta.data)) {
        const select = document.getElementById('funcionarioVenda');
        select.innerHTML = '<option value="">Selecione um funcionário</option>';

        resposta.data.forEach(func => {
          const option = document.createElement('option');
          option.value = func.id;
          option.textContent = func.nome;
          select.appendChild(option);
        });
      }
    })
    .catch(erro => {
      console.log("Erro ao carregar funcionários:", erro);
    });
}

function adicionarProdutoCarrinho() {
  const nomeProduto = document.querySelector('#venda input[placeholder="Digite ou leia o código"]').value.trim();
  const quantidade = parseFloat(document.querySelector('#venda input[type="number"]').value) || 1;

  if (!nomeProduto) {
    mostrarMensagem('erro', 'Digite um nome de produto!');
    return;
  }

  console.log('Buscando produto:', nomeProduto);

  // Buscar produto pelo nome
  fetch(`http://localhost:3000/produtos/nome?nome=${encodeURIComponent(nomeProduto)}`)
    .then(res => res.json())
    .then(resposta => {
      console.log('Resposta do servidor:', resposta);

      if (resposta.sucesso && resposta.data && resposta.data.length > 0) {
        const produto = resposta.data[0]; // Pegar o primeiro resultado
        const precoUnitario = parseFloat(produto.preco);

        // Verificar se produto já está no carrinho
        const itemExistente = carrinhoItems.find(item => item.id === produto.id);

        if (itemExistente) {
          itemExistente.quantidade += quantidade;
        } else {
          carrinhoItems.push({
            id: produto.id,
            nome: produto.nome,
            unidade: produto.unidade,
            preco_unitario: precoUnitario,
            quantidade: quantidade
          });
        }

        console.log('Carrinho atualizado:', carrinhoItems);
        atualizarCarrinho();
        document.querySelector('#venda input[placeholder="Digite ou leia o código"]').value = '';
        document.querySelector('#venda input[type="number"]').value = '1';
        mostrarMensagem('sucesso', 'Produto adicionado ao carrinho!');
      } else {
        mostrarMensagem('erro', 'Produto não encontrado!');
      }
    })
    .catch(erro => {
      console.log("Erro:", erro);
      mostrarMensagem('erro', 'Erro ao buscar produto');
    });
}

function removerDoCarrinho(indice) {
  carrinhoItems.splice(indice, 1);
  atualizarCarrinho();
  mostrarMensagem('sucesso', 'Produto removido do carrinho!');
}

function atualizarCarrinho() {
  const container = document.getElementById('itensCarrinho');
  const totalDiv = document.getElementById('totalCarrinho');

  if (carrinhoItems.length === 0) {
    container.innerHTML = '<p style="color: #999;">Nenhum produto no carrinho</p>';
    totalDiv.textContent = 'Total: R$ 0,00';
    return;
  }

  let html = '';
  let total = 0;

  carrinhoItems.forEach((item, indice) => {
    const subtotal = item.preco_unitario * item.quantidade;
    total += subtotal;

    html += `
      <div class="item-carrinho" style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee;">
        <div style="flex: 1;">
          <span><strong>${item.nome}</strong> (${item.quantidade} x ${item.unidade})</span>
          <br/>
          <span style="color: #666;">R$ ${item.preco_unitario.toFixed(2)} x ${item.quantidade} = R$ ${subtotal.toFixed(2)}</span>
        </div>
        <button class="btn btn-danger" style="padding: 5px 10px; font-size: 12px; margin-left: 10px;" onclick="removerDoCarrinho(${indice})">
          Remover
        </button>
      </div>
    `;
  });

  container.innerHTML = html;
  totalDiv.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function salvarVenda() {
  if (carrinhoItems.length === 0) {
    mostrarMensagem('erro', 'Carrinho vazio! Adicione produtos antes de finalizar.');
    return;
  }

  // Abrir modal para selecionar cliente
  abrirModalCliente();
}

function abrirModalCliente() {
  // Carregar clientes
  fetch("http://localhost:3000/clientes")
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso && Array.isArray(resposta.data)) {
        const select = document.getElementById('selectClienteVenda');
        select.innerHTML = '<option value="">Venda Sem Cliente</option>';

        resposta.data.forEach(cliente => {
          const option = document.createElement('option');
          option.value = cliente.id;
          option.textContent = `${cliente.nome} (ID: ${cliente.id})`;
          select.appendChild(option);
        });
      }
      // Mostrar modal
      document.getElementById('modalCliente').style.display = 'flex';
    })
    .catch(erro => {
      console.log("Erro ao carregar clientes:", erro);
      mostrarMensagem('erro', 'Erro ao carregar clientes');
    });
}

function fecharModalCliente() {
  document.getElementById('modalCliente').style.display = 'none';
}

function confirmarClienteVenda() {
  const cliente_id = document.getElementById('selectClienteVenda').value || null;
  const funcionario_id = document.querySelector('#venda select#funcionarioVenda').value || null;
  const forma_pagamento = document.querySelector('#venda select:nth-of-type(1)').value || 'Dinheiro';

  const total = carrinhoItems.reduce((sum, item) => sum + (item.preco_unitario * item.quantidade), 0);

  const dados = {
    cliente_id: cliente_id,
    funcionario_id: funcionario_id,
    valor_total: total,
    data_venda: new Date().toISOString().split('T')[0],
    forma_pagamento: forma_pagamento,
    itens: carrinhoItems.map(item => ({
      produto_id: item.id, //nao trocar pra id_produto pq o backend espera produto_id
      quantidade: item.quantidade,
      preco_unitario: item.preco_unitario
    }))
  };

  console.log('Dados da venda a enviar:', dados);

  fetch("http://localhost:3000/vendas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dados)
  })
    .then(res => res.json())
    .then(resposta => {
      console.log('Resposta do servidor:', resposta);
      if (resposta.sucesso) {
        mostrarMensagem('sucesso', 'Venda finalizada com sucesso!');
        carrinhoItems = [];
        atualizarCarrinho();
        listarVendas();
        fecharModalCliente();
      } else {
        mostrarMensagem('erro', resposta.message || 'Erro ao registrar venda');
      }
    })
    .catch(erro => {
      console.log("Erro:", erro);
      mostrarMensagem('erro', 'Erro na comunicação com o servidor');
    });
}

function listarVendas() {
  fetch("http://localhost:3000/vendas")
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso && Array.isArray(resposta.data)) {
        exibirVendasTabela(resposta.data);
      }
    })
    .catch(erro => {
      console.log("Erro ao listar vendas:", erro);
    });
}

function exibirVendasTabela(vendas) {
  const container = document.getElementById('listaVendas');
  if (!container) return;

  if (vendas.length === 0) {
    container.innerHTML = '<p>Nenhuma venda registrada</p>';
    return;
  }

  let html = '<table style="width: 100%; border-collapse: collapse;">';
  html += '<thead><tr><th>ID</th><th>Cliente</th><th>Valor Total</th><th>Data</th><th>Ações</th></tr></thead><tbody>';

  vendas.forEach(venda => {
    const data = new Date(venda.data_venda).toLocaleDateString('pt-BR');
    const clienteNome = venda.cliente_nome || 'Sem Cliente';
    html += `<tr style="border-bottom: 1px solid #ddd;">
      <td>${venda.id}</td>
      <td>${clienteNome}</td>
      <td>R$ ${parseFloat(venda.valor_total).toFixed(2)}</td>
      <td>${data}</td>
      <td>
        <button class="btn-table btn-table-editar" onclick="editarVenda(${venda.id})">Editar</button>
        <button class="btn-table btn-table-excluir" onclick="excluirVenda(${venda.id})">Excluir</button>
      </td>
    </tr>`;
  });

  html += '</tbody></table>';
  container.innerHTML = html;
}

function editarVenda(id) {
  fetch(`http://localhost:3000/vendas/${id}`)
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso) {
        mostrarMensagem('info', 'Funcionalidade de edição em desenvolvimento');
      }
    })
    .catch(erro => console.log("Erro:", erro));
}

function excluirVenda(id) {
  // EDITED BY ARTHUR NOGUEIRA - Substituído confirm() nativo pelo modal de confirmação
  confirmarAcao('Tem certeza que deseja excluir esta venda?', 'Excluir Venda', '🗑️', function () {
    fetch(`http://localhost:3000/vendas/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(resposta => {
        if (resposta.sucesso) {
          mostrarMensagem('sucesso', 'Venda excluída com sucesso!');
          listarVendas();
        }
      })
      .catch(erro => {
        console.log("Erro:", erro);
        mostrarMensagem('erro', 'Erro ao excluir venda');
      });
  }); // END EDITED BY ARTHUR NOGUEIRA
}


let chart;

function gerarRelatorio() {

  const dataInicio = document.getElementById("dataInicio").value;
  const dataFim = document.getElementById("dataFim").value;
  const produto = document.getElementById("produto").value;
  const pagamento = document.getElementById("pagamento").value;

  fetch("http://localhost:3000/relatorios/vendas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      dataInicio,
      dataFim,
      produto,
      pagamento
    })
  })
    .then(res => res.json())
    .then(data => {

      console.log("DADOS RECEBIDOS:", data);

      if (!data || data.length === 0) {
        alert("Nenhum dado encontrado");
        return;
      }

      const produtos = data.map(v => v.produto);

      // ⚠️ CONFIRMA O NOME AQUI
      const valores = data.map(v => v.quantidade || v.quantidade_total);

      const totalVendas = valores.reduce((sum, v) => sum + Number(v), 0);

      document.getElementById("total").innerText =
        "Total de Itens Vendidos: " + totalVendas;

      if (chart) chart.destroy();

      chart = new Chart(document.getElementById("grafico"), {
        type: "bar",
        data: {
          labels: produtos,
          datasets: [{
            label: "Quantidade Vendida",
            data: valores
          }]
        }
      });

    })
    .catch(err => {
      console.error("Erro ao gerar relatório:", err);
    });

}

function carregarProdutosRelatorio() {
  fetch("http://localhost:3000/produtos")
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso && Array.isArray(resposta.data)) {
        const select = document.getElementById('produto');
        select.innerHTML = '<option value="Todos">Todos</option>';
        resposta.data.forEach(produto => {
          const option = document.createElement('option');
          option.value = produto.nome;
          option.textContent = produto.nome;
          select.appendChild(option);
        });
      }
    })
    .catch(erro => console.log("Erro ao carregar produtos relatório:", erro));
}


// ==================== FIADO ====================

function listarFiadosClientes() {
  fetch("http://localhost:3000/fiado")
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso && Array.isArray(resposta.data)) {
        exibirFiadosTabela(resposta.data);
      } else {
        document.getElementById('tabelaFiadoClientes').innerHTML = '<tr><td colspan="4" style="text-align: center;">Nenhuma conta a receber</td></tr>';
      }
    })
    .catch(erro => {
      console.log("Erro ao listar fiados:", erro);
      document.getElementById('tabelaFiadoClientes').innerHTML = '<tr><td colspan="4" style="text-align: center; color: red;">Erro ao carregar dados</td></tr>';
    });
}

function exibirFiadosTabela(fiados) {
  const container = document.getElementById('tabelaFiadoClientes');

  if (fiados.length === 0) {
    container.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhuma conta fiado</td></tr>';
    return;
  }

  let html = '';
  fiados.forEach(venda => {
    const dataFormatada = new Date(venda.ultima_compra).toLocaleDateString('pt-BR');
    const totalFormatado = parseFloat(venda.total_devido).toFixed(2);

    html += `
      <tr>
        <td>${venda.cliente_nome || 'Sem Cliente'}</td>
        <td>${venda.cliente_id}</td>
        <td>${dataFormatada}</td>
        <td>R$ ${totalFormatado}</td>
        <td>
          <button class="btn-table btn-table-editar" onclick="carregarDetalhesVenda(${venda.venda_id}, '${venda.cliente_nome}')">
            Detalhes
          </button>
        </td>
      </tr>
    `;
  });

  container.innerHTML = html;
}

function carregarDetalhesVenda(vendaId, nomeCliente) {
  fetch(`http://localhost:3000/fiado/${vendaId}`)
    .then(res => res.json())
    .then(resposta => {
      if (resposta.sucesso && Array.isArray(resposta.data)) {
        exibirDetalhesCliente(resposta.data, nomeCliente);
      }
    })
    .catch(erro => {
      console.log("Erro ao carregar detalhes:", erro);
      mostrarMensagem('erro', 'Erro ao carregar detalhes da venda');
    });
}

function exibirDetalhesCliente(detalhes, nomeCliente) {
  document.getElementById('nomeClienteSelecionado').textContent = nomeCliente;
  document.getElementById('tituloDetalhes').style.display = 'block';
  document.getElementById('tabelaDetalhes').style.display = 'table';

  const tbody = document.getElementById('tabelaDetalhesCorpo');

  if (!detalhes || detalhes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Nenhuma compra registrada</td></tr>';
    return;
  }

  let html = '';
  let totalVenda = 0;

  detalhes.forEach((item, index) => {
    const dataFormatada = new Date(item.data_venda).toLocaleDateString('pt-BR');
    const precoFormatado = parseFloat(item.preco_unitario || 0).toFixed(2);
    const subtotalFormatado = parseFloat(item.subtotal || 0).toFixed(2);

    totalVenda += parseFloat(item.subtotal || 0);

    html += `
      <tr>
        <td>${dataFormatada}</td>
        <td>${item.produto || 'Produto desconhecido'}</td>
        <td>${item.quantidade || 0}</td>
        <td>R$ ${precoFormatado}</td>
        <td>R$ ${subtotalFormatado}</td>
      </tr>
    `;
  });

  html += `
    <tr style="background: #f9f9f9; font-weight: bold; border-top: 2px solid #333;">
      <td colspan="4" style="text-align: right;">TOTAL:</td>
      <td>R$ ${totalVenda.toFixed(2)}</td>
    </tr>
  `;

  tbody.innerHTML = html;

  // Scroll até a tabela de detalhes
  setTimeout(() => {
    document.getElementById('tabelaDetalhes').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// Carregar fiados ao inicializar a página (adicionar na função DOMContentLoaded)
// Será preciso adicionar: listarFiadosClientes(); na função de inicialização