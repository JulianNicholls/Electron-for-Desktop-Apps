const electron = require('electron');
const { ipcRenderer } = electron;

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const { path } = form.querySelector('input').files[0];

  ipcRenderer.send('video:submit', path);
});
