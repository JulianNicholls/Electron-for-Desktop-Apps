const { BrowserWindow } = require('electron');

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 295,
      height: 500,
      frame: false,
      resizable: false,
      show: false,

      // Ensure that we don't get throttled in the background,
      // otherwise the timers won't run.
      webPreferences: { backgroundThrottling: false }
    });

    this.loadURL(url);

    this.on('blur', () => {
      this.hide();
    });
  }
}

module.exports = MainWindow;
