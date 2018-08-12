const { app, Tray, Menu } = require('electron');
const positioner = require('electron-traywindow-positioner');

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;
    this.setToolTip('Timer App');

    const onToggle = this.onToggle.bind(this);

    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Show / Hide',
        click() {
          onToggle();
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

    this.setContextMenu(contextMenu);
  }

  onToggle() {
    if (this.mainWindow.isVisible()) this.mainWindow.hide();
    else {
      positioner.position(this.mainWindow, this.getBounds());
      this.mainWindow.show();
    }
  }
}

module.exports = TimerTray;

// Other option on Linux
// this.on('click', (event, bounds) => {

//   if (mainWindow.isVisible()) mainWindow.hide();
//   else {
//     positioner.position(mainWindow, this.getBounds());
//     mainWindow.show();
//   }
// });
