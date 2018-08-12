const { BrowserWindow } = require('electron');

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 295,
      height: 500,
      frame: false,
      resizable: false,
      show: false
    });

    this.loadURL(url);
  }
}

module.exports = MainWindow;
