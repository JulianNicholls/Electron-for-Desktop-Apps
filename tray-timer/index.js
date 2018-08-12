const electron = require('electron');
const path = require('path');

const { app } = electron;

const MainWindow = require('./app/MainWindow');
const TimerTray = require('./app/TimerTray');

app.on('ready', () => {
  const mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === 'win32' ? 'windows-icon.png;' : 'iconWhite.png';
  const iconPath = path.join(__dirname, 'src', 'assets', iconName);

  new TimerTray(iconPath, mainWindow);
});
