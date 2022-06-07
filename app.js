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


// Criando o elemento que vai ser dinâmico
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
}