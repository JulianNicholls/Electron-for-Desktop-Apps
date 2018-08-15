const { app, BrowserWindow, ipcMain, shell } = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { backgroundThrottling: false }
  });

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
});

// Return the duration, size, and file format of the added videos

ipcMain.on('videos:add', (_, videos) => {
  const videoPromises = videos.map(
    video =>
      new Promise((resolve, reject) => {
        ffmpeg.ffprobe(video.path, (err, videoData) => {
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

// Convert the videos, returning progress and completion
ipcMain.on('videos:convert', (_, videos) => {
  videos.forEach(video => {
    const { dir, name } = path.parse(video.path);
    const outputPath = `${dir}/${name}.${video.format}`;

    ffmpeg(video.path)
      .output(outputPath)
      .on('progress', ({ timemark }) => {
        mainWindow.webContents.send('videos:convert:progress', { video, timemark });
      })
      .on('end', () => {
        mainWindow.webContents.send('videos:convert:end', { video, outputPath });
      })
      .run();
  });
});

// Open the folder that the outputPath points to
ipcMain.on('video:open', (_, outputPath) => {
  shell.showItemInFolder(outputPath);
});
