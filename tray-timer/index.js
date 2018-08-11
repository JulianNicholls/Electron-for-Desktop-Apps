const electron = require('electron');
const path = require('path');

const { app, BrowserWindow, Tray, Menu } = electron;

let mainWindow, tray;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 295,
    height: 500,
    frame: false,
    resizable: false,
    show: false
  });

  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === 'win32' ? 'windows-icon.png;' : 'iconWhite.png';
  const iconPath = path.join(__dirname, 'src', 'assets', iconName);

  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show / Hide',
      click() {
        if (mainWindow.isVisible()) mainWindow.hide();
        else mainWindow.show();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);
});
