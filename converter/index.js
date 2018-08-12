const { app, ipcMain } = require('electron');
const path = require('path');

const MainWindow = require('./app/MainWindow');
const TimerTray = require('./app/TimerTray');

let tray;

app.on('ready', () => {
  const mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === 'win32' ? 'windows-icon.png;' : 'iconWhite.png';
  const iconPath = path.join(__dirname, 'src', 'assets', iconName);

  tray = new TimerTray(iconPath, mainWindow);

  //  app.dock.hide();  // Not on Linux
});

// This doesn't do anything on Linux (or Windows, probably)
ipcMain.on('timer:update', (event, text) => {
  tray.setTitle(text);
});
