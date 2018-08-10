const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');

const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', () => {
  console.log('App is Ready.');

  mainWindow = new BrowserWindow({});

  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('video:submit', (event, path) => {
  ffmpeg.ffprobe(path, (err, videoData) => {
    if (err) return console.error(err);

    const {
      format: { format_long_name, duration, size, bit_rate }
    } = videoData;

    mainWindow.webContents.send('video:info', {
      format_long_name,
      duration,
      size,
      bit_rate
    });
  });
});
