const formulario = document.querySelector('#cadastro');
const nome = document.querySelector('#nome');
const nascimento = document.querySelector('#nascimento');
const email = document.querySelector('#email');
const telefone = document.querySelector('#telefone');
const pais = document.querySelector('#pais');
const estado = document.querySelector('#estado');
const cidade = document.querySelector('#cidade');
const mensagem = document.querySelector('#mensagem');
const lista = document.querySelector('#lista');
const vazio = document.querySelector('#vazio');
const limpar = document.querySelector('[data-cy="limpar"]');

const localidades = {
  BR: {
    label: 'Brasil',
    estados: {
      Goiás: ['Goiânia', 'Anápolis'],
      'São Paulo': ['São Paulo', 'Campinas']
    }
  },
  PT: {
    label: 'Portugal',
    estados: {
      Lisboa: ['Lisboa', 'Sintra'],
      Porto: ['Porto', 'Braga']
    }
  }
};

function definirOpcoes(campo, itens, textoInicial) {
  campo.replaceChildren(new Option(textoInicial, ''));
  itens.forEach((item) => campo.add(new Option(item, item)));
  campo.disabled = itens.length === 0;
}

function atualizarEstados() {
  const dadosDoPais = localidades[pais.value];
  const estados = dadosDoPais ? Object.keys(dadosDoPais.estados) : [];
  definirOpcoes(estado, estados, 'Selecione');
  atualizarCidades();
}

function atualizarCidades() {
  const cidades = localidades[pais.value]?.estados[estado.value] || [];
  definirOpcoes(cidade, cidades, 'Selecione');
}

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.dataset.tipo = tipo;
}

function validar() {
  const nomeLimpo = nome.value.trim();
  const digitosTelefone = telefone.value.replace(/\D/g, '');
  const hoje = new Date().toISOString().slice(0, 10);

  if (nomeLimpo.length < 3) return ['Informe um nome com pelo menos 3 caracteres.', nome];
  if (!nascimento.value || nascimento.value > hoje) return ['Informe uma data de nascimento válida, até hoje.', nascimento];
  if (!email.checkValidity()) return ['Informe um e-mail válido.', email];
  if (digitosTelefone.length < 8 || digitosTelefone.length > 15) return ['Informe um telefone com 8 a 15 dígitos.', telefone];
  if (!pais.value) return ['Selecione um país.', pais];
  if (!estado.value) return ['Selecione um estado ou região.', estado];
  if (!cidade.value) return ['Selecione uma cidade.', cidade];
  return null;
}

function adicionarParticipante() {
  const item = document.createElement('li');
  const localidade = localidades[pais.value];
  item.textContent = `${nome.value.trim()} — ${cidade.value}, ${estado.value}, ${localidade.label}`;
  lista.append(item);
  vazio.hidden = true;
}

function limparFormulario() {
  formulario.reset();
  atualizarEstados();
  nome.focus();
}

pais.addEventListener('change', atualizarEstados);
estado.addEventListener('change', atualizarCidades);

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const erro = validar();

  if (erro) {
    mostrarMensagem(erro[0], 'erro');
    erro[1].focus();
    return;
  }

  adicionarParticipante();
  mostrarMensagem('Cadastro realizado com sucesso.', 'sucesso');
  limparFormulario();
});

limpar.addEventListener('click', () => {
  lista.replaceChildren();
  vazio.hidden = false;
  mostrarMensagem('Lista de participantes limpa.', 'neutro');
  nome.focus();
});

atualizarEstados();
