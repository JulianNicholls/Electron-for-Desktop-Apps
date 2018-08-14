const electron = require('electron');
const { ipcRenderer } = electron;

const form = document.querySelector('form');
const infoDiv = document.getElementById('info');

form.addEventListener('submit', event => {
  event.preventDefault();

  const { path } = document.getElementById('video').files[0];

  ipcRenderer.send('video:submit', path);
});

ipcRenderer.on('video:info', (event, videoInfo) => {
  infoDiv.innerHTML = `<table><tbody>
  <tr><td>Format</td><td>${videoInfo.format}</td></tr>
  <tr><td>Duration</td><td>${humanDuration(videoInfo.duration)}</td></tr>
  <tr><td>Size</td><td>${humanSize(videoInfo.size)}</td></tr>
  <tr><td>Bit Rate</td><td>${humanSize(videoInfo.bit_rate)}/s</td></tr>
  </tbody></table>
  `;
});

const humanSize = size => {
  if (size > 1400000) return `${(size / 1048576).toFixed(1)}MB`;

  return `${(size / 1024).toFixed(2)}KB`;
};

const humanDuration = length => {
  length = Math.round(length);

  const hours = length > 3600 ? `${Math.floor(length / 3600)}:` : '';
  const mins = Math.floor((length % 3600) / 60);
  const secs = length % 60;

  if (hours === '' && mins === 0) return `${secs}s`;

  return `${hours}${mins < 10 ? '0' + mins : mins}: ${
    secs < 10 ? '0' + secs : secs
  }`;
};
