// 'use strict';

// Elemento HTML a ser criado dinamicamente pelo JS
/* <label class="todo__item">
<input type="checkbox">
<div>teste de item 1</div>
<input type="button" value="X">
</label> */


// array para guardar os elementos - Banco de Dados
let banco = [
  {
    'tarefa': 'JavaScript',
    'status': '',
  },
  {
    'tarefa': 'React JS',
    'status': 'checked',
  },
  {
    'tarefa': 'React Native',
    'status': '',
  }
];


// ================== Criação do Item ===================================================================

// Criando o elemento com o JS que vai ser dinâmico no DOM
// Task será o argumento recebido e o status para ver se já está marcado
// Para a identificação da posição é inserido um data-index para a manipulação
const criarItem = (tarefa, status, indice) => { // Função com os parâmetros
  const item = document.createElement('label'); // Criar o elemento
  item.classList.add('todo__item'); // Adicionar a classe
  // Adicionar o item na DOM
  item.innerHTML = ` 
  <input type="checkbox" ${status} data-indice=${indice}/>
  <div>${tarefa}</div>
  <input type="button" value="X" data-indice=${indice}/>
  `;
  // Adicionando o elemento filho ao pai
  document.getElementById('todoList').appendChild(item)
}

// =================== Deletando =========================================================================

// Para NÃO REPETIR OS DADOS quando a função for chamada
const limparTarefas = () => {
  const todoList = document.getElementById('todoList');

  // Enquanto existir um filho, remova um filho, sendo ele o último
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
}

// ================== Atualizar a tela depois de qualquer alteração =======================================

// Toda vez que o banco for alterado a tela é mostrada com os dados atualizados
const atualizarTela = () => {
  // Limpar as tarefas para os dados não serem duplicados
  limparTarefas();
  banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

// ===================== Limpando o input ==================================================================
const limparInput = (evento) => {
  evento.target.value = '';
}


// =============== Inserindo o item no array, atualizando o array e limpando os inputs =====================

const inserirItem = (evento) => {
  const tecla = evento.key;
  // console.log(key);
  const texto = evento.target.value

  if (tecla === 'Enter') {
    banco.push({ 'tarefa': texto, 'status': '' });
    atualizarTela();
    limparInput();
  }
}


// ========================== Remoção do item ==============================================================



// Removeu o item do banco e atualizou a tela com os dados atualizados do banco
const removerItem = (indice) => {
  banco.splice(indice, 1);
  atualizarTela();
}

const atualizarItem = (indice) => {
  banco[indice].status = banco[indice].status === '' ? 'checked' : '';
  atualizarTela();
}

// Clicando, capturando o item e recebendo seu index para a remoção do index escolhido
// dataset é a propriedade que captura o dado colocado quando se usa o data-nome
const clickItem = (evento) => {
  const elemento = evento.target;

  // Se o element for igual ao button, eu removo o elemento
  if (elemento.type === "button") {
    const indice = elemento.dataset.indice;

    removerItem(indice)

    // Se o element for igual ao checkbox eu atualizo inserindo o checkbox no db na tarefa
  } else if (elemento.type === 'checkbox') {
    const indice = elemento.dataset.indice;
    atualizarItem(indice);
  }
}

// evento envia para o callback (insertItem) o event com suas propriedades
document.getElementById('newItem').addEventListener('keypress', inserirItem);

// Atualizar o banco e depois atualizar a tela (Atento para não atualizar só a tela)
// Pegando a div para reconhecer com o clickItem qual elemento estou clicando 
document.getElementById('todoList').addEventListener('click', clickItem);
atualizarTela();