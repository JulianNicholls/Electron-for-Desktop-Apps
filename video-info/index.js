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
      format: { format_long_name: format, duration, size, bit_rate },
      streams,
    } = videoData;

    const [video, audio] = streams;

    console.log({ video });

    const resolution = `${video.codec_name} ${video.width}x${video.height}`;

    mainWindow.webContents.send('video:info', {
      resolution,
      format,
      duration,
      size,
      bit_rate,
    });
  });
});
