const electron = require('electron');
const { ipcRenderer } = electron;

const form = document.getElementById('task-form');
const task = document.getElementById('new-task');

form.addEventListener('submit', event => {
  event.preventDefault();

  ipcRenderer.send('task:submit', task.value);
});
