const electron = require('electron');
const { ffprobe } = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
  console.log('App is Ready.');

  mainWindow = new BrowserWindow({});

  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
  ffprobe(path, (err, videoData) => {
    if (err) return console.error(err);

    const {
      format: { format_long_name: format, duration, size, bit_rate }
    } = videoData;

    mainWindow.webContents.send('video:info', {
      format,
      duration,
      size,
      bit_rate
    });
  });
});
