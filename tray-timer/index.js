const electron = require('electron');
const positioner = require('electron-traywindow-positioner');

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
        else {
          positioner.position(mainWindow, tray.getBounds());
          mainWindow.show();
        }
      }
    },
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click() {
        app.quit();
      }
    }
  ]);

  tray.setContextMenu(contextMenu);

  // Other option on Linux
  // tray.on('click', (event, bounds) => {

  //   if (mainWindow.isVisible()) mainWindow.hide();
  //   else {
  //     positioner.position(mainWindow, tray.getBounds());
  //     mainWindow.show();
  //   }
  // });
});
