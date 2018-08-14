const { app, BrowserWindow, ipcMain } = require('electron');
const { ffprobe } = require('fluent-ffmpeg');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { backgroundThrottling: false }
  });

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

ipcMain.on('videos:add', (event, videos) => {
  const videoPromises = videos.map(
    video =>
      new Promise((resolve, reject) => {
        ffprobe(video.path, (err, videoData) => {
          if (err) reject(err);

          const {
            format: { format_long_name: fileFormat, duration }
          } = videoData;

          video = { ...video, duration, fileFormat, format: 'avi' };
          resolve(video);
        });
      })
  );

  Promise.all(videoPromises).then(results =>
    mainWindow.webContents.send('videos:info', results)
  );
});
