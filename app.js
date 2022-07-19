// 'use strict';

// Elemento HTML a ser criado dinamicamente pelo JS
/* <label class="todo__item">
<input type="checkbox">
<div>teste de item 1</div>
<input type="button" value="X">
</label> */


// array para guardar os elementos - Banco de Dados
let db = [
  {'tarefa': 'Estudar JS', 'status': '',},
  {'tarefa': 'Netflix', 'status': 'checked'}
];


// ================== Criação do Item ===================================================================

// Criando o elemento com o JS que vai ser dinâmico no DOM
// Task será o argumento recebido e o status para ver se já está marcado
// Para a identificação da posição é inserido um data-index para a manipulação
const createItem = (task, status, index) => { // Função com os parâmetros
  const item = document.createElement('label'); // Criar o elemento
  item.classList.add('todo__item'); // Adicionar a classe
  // Adicionar o item na DOM
  item.innerHTML = ` 
  <input type="checkbox" ${status} data-index=${index}/>
  <div>${task}</div>
  <input type="button" value="X" data-index=${index}/>
  `
  // Adicionando o elemento filho ao pai
  document.getElementById('todoList').appendChild(item)
}

// =================== Deletando =========================================================================

// Para limpar os dados e não repetir
const cleanTasks = () => {
  const todoList = document.getElementById('todoList');
  
  // Enquanto existir o primeiro filho, remova um filho, sendo ele o último
  while(todoList.firstChild) {
    todoList.removeChild(todoList.lastChild)
  }
}

// ================== Atualizar a tela depois de qualquer alteração =======================================

// Toda vez que o banco for alterado a tela é mostrada com os dados atualizados
const updateScreen = () => {
  // Limpar as tarefas para os dados não serem duplicados
  cleanTasks();
  db.forEach((item, index) => createItem(item.tarefa, item.status, index));
}

// ===================== Limpando o input ==================================================================
const cleanInputTask = () => {
  event.target.value = '';
}


// =============== Inserindo o item no array, atualizando o array e limpando os inputs =====================

const insertItem = (event) => {
  const key = event.key;
  // console.log(key);
  const text = event.target.value
  
  if (key === 'Enter') {
    db.push({'tarefa': text, 'status': ''});
    updateScreen();
    cleanInputTask();
  }
}


// ========================== Remoção do item ==============================================================

const removeItem =(indexNumber) => {
  db.splice(indexNumber, 1);
  // updateScreen();
}

// Clicando, capturando o item e recebendo seu index para a remoção d index escolhido
const clickItem = (event) => {
  const element = event.target
  console.log(element)
  if(element.type === "button") {
    const indexNumber = element.dataset.index;
    console.log(indexNumber)
    removeItem(indexNumber)
  }
}

// evento envia para o callback (insertItem) o event com suas propriedades
document.getElementById('newItem').addEventListener('keypress', insertItem);

// Atualizar o banco e depois atualizar a tela (Atento para não atualizar só a tela)
document.getElementById('todoList').addEventListener('click', clickItem);