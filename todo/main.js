const electron = require('electron');
const { ipcRenderer } = electron;

const taskList = document.querySelector('.task-list ul');

ipcRenderer.on('task:new', (event, task) => {
  const elem = document.createElement('li');
  const text = document.createTextNode(task);

  elem.appendChild(text);
  taskList.appendChild(elem);
});

ipcRenderer.on('tasks:clear', event => {
  taskList.innerHTML = '';
});
