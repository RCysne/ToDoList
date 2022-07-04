// 'use strict';

// Elemento HTML a ser criado dinamicamente pelo JS
{/* <label class="todo__item">
<input type="checkbox">
<div>teste de item 1</div>
<input type="button" value="X">
</label> */}

let db = [
  {'tarefa': 'Estudar JS', 'status': '',},
  {'tarefa': 'Netflix', 'status': 'checked'}
]


// Criando o elemento com o JS que vai ser dinâmico no DOM
// Task será o argumento recebido e o status para ver se já está marcado
const createItem = (task, status='') => {
  const item = document.createElement('label');
  item.classList.add('todo__item');
  item.innerHTML = `
  <input type="checkbox" ${status}>
  <div>${task}</div>
  <input type="button" value="X">
  `
  // Adicionando o elemento item ao elemento pai, localizado pelo id
  document.getElementById('todoList').appendChild(item)
  // Chamando a função ele vai criar o elemento e adicionar o item ao pai
}


const cleanTasks = () => {
  const todoList = document.getElementById('todoList');
  // Enquanto existir o primeiro filho, remova um filho, sendo o último filho
  while(todoList.firstChild) {
    todoList.removeChild(todoList.lastChild)
  }
}


// Toda vez que o banco for alterado a tela é mostrada com os dados atualizados
const updateScreen = () => {
  // Limpar as tarefas para os dados não serem duplicados
  cleanTasks();
  db.forEach(item => createItem(item.tarefa, item.status));
}

const cleanInputTask = () => {
  event.target.value = '';
}


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

const clickItem = () => {
  
}

// evento envia para o callback (insertItem) o event com suas propriedades
document.getElementById('newItem').addEventListener('keypress', insertItem);

// Atualizar o banco e depois atualizar a tela (Atento para não atualizar só a tela)
document.getElementById('todoList').addEventListener('click', clickItem);